import { useEffect, useState } from 'react';
import { Card, Button, Form, Spinner, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { supabase } from '@/lib/supabaseClient';
import Swal from 'sweetalert2';
// import Flatpicker from '@/components/Flatpicker';

const MyProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        address: '',
        phone: '',
    });

    const [formValues, setFormValues] = useState(userData);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const email = localStorage.getItem('zeko_username');
            if (!email) return;

            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                Swal.fire('Error', 'Failed to fetch user profile.', 'error');
                return;
            }

            const { user_metadata } = user;

            const profile = {
                firstName: user_metadata.firstName || '',
                lastName: user_metadata.lastName || '',
                email: user.email || '',
                dob: user_metadata.dob || '',
                address: user_metadata.address || '',
                phone: user_metadata.phone || '',
            };

            setUserData(profile);
            setFormValues(profile);
            setLoading(false);
        };

        fetchUserProfile();
    }, []);

    const handleChange = (field: string, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);

        const { error } = await supabase.auth.updateUser({
            data: {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                dob: formValues.dob,
                address: formValues.address,
                phone: formValues.phone,
            },
        });

        setSaving(false);

        if (error) {
            Swal.fire('Error', 'Failed to update profile.', 'error');
        } else {
            setUserData(formValues);
            setEditMode(false);
            Swal.fire('Success', 'Profile updated successfully.', 'success');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <Card className="shadow border-0 rounded-4 p-3">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0 text-body">My Profile</h4>
                    <OverlayTrigger
                        overlay={
                            <Tooltip>
                                {editMode ? 'Save your changes' : 'Edit your profile'}
                            </Tooltip>
                        }
                    >
                        <Button
                            variant={editMode ? 'success' : 'outline-primary'}
                            onClick={editMode ? handleSave : () => setEditMode(true)}
                            disabled={saving}
                            className="px-4"
                        >
                            {saving ? 'Saving...' : editMode ? 'Save' : 'Edit'}
                        </Button>
                    </OverlayTrigger>
                </div>

                <Form>
                    <Row className="mb-3">
                        <Form.Label column sm={4} className="fw-semibold text-muted">
                            First Name:
                        </Form.Label>
                        <Col sm={8}>
                            {editMode ? (
                                <Form.Control
                                    type="text"
                                    value={formValues.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                />
                            ) : (
                                <div className="pt-1">{userData.firstName}</div>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm={4} className="fw-semibold text-muted">
                            Last Name:
                        </Form.Label>
                        <Col sm={8}>
                            {editMode ? (
                                <Form.Control
                                    type="text"
                                    value={formValues.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                />
                            ) : (
                                <div className="pt-1">{userData.lastName}</div>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm={4} className="fw-semibold text-muted">
                            Email:
                        </Form.Label>
                        <Col sm={8}>
                            <div className="pt-1 text-secondary">{userData.email}</div>
                        </Col>
                    </Row>

                    {/* <Row className="mb-3">
                        <Form.Label column sm={4} className="fw-semibold text-muted">
                            Date of Birth:
                        </Form.Label>
                        <Col sm={8}>
                            {editMode ? (
                                <Flatpicker
                                    value={formValues.dob ? new Date(formValues.dob) : undefined}
                                    options={{ dateFormat: 'Y-m-d', maxDate: 'today' }}
                                    className="form-control"
                                    getValue={(date) => {
                                        const iso = Array.isArray(date)
                                            ? date[0].toISOString().split('T')[0]
                                            : date.toISOString().split('T')[0];
                                        handleChange('dob', iso);
                                    }}
                                />
                            ) : (
                                <div className="pt-1">{userData.dob}</div>
                            )}
                        </Col>
                    </Row> */}

                    {/* <Row className="mb-3">
                        <Form.Label column sm={4} className="fw-semibold text-muted">
                            Address:
                        </Form.Label>
                        <Col sm={8}>
                            {editMode ? (
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={formValues.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                />
                            ) : (
                                <div className="pt-1">{userData.address}</div>
                            )}
                        </Col>
                    </Row> */}

                    {/* <Row className="mb-3">
                        <Form.Label column sm={4} className="fw-semibold text-muted">
                            Phone:
                        </Form.Label>
                        <Col sm={8}>
                            {editMode ? (
                                <Form.Control
                                    type="tel"
                                    value={formValues.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                />
                            ) : (
                                <div className="pt-1">{userData.phone}</div>
                            )}
                        </Col>
                    </Row> */}
                </Form>
            </Card.Body>
        </Card>
    );
};

export default MyProfile;
