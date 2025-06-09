import { useEffect, useState } from 'react';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import { supabase } from '@/lib/supabaseClient';
import Swal from 'sweetalert2';
import Flatpicker from '@/components/Flatpicker';

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
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Card className="shadow-sm border-0 mb-5">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">My Profile</h4>
                    {!editMode ? (
                        <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                            Edit
                        </Button>
                    ) : (
                        <Button variant="success" onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Save'}
                        </Button>
                    )}
                </div>

                <Form>
                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-4 fw-semibold">First Name:</Form.Label>
                        <div className="col-sm-8">
                            {editMode ? (
                                <Form.Control
                                    type="text"
                                    value={formValues.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                />
                            ) : (
                                <div>{userData.firstName}</div>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-4 fw-semibold">Last Name:</Form.Label>
                        <div className="col-sm-8">
                            {editMode ? (
                                <Form.Control
                                    type="text"
                                    value={formValues.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                />
                            ) : (
                                <div>{userData.lastName}</div>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-4 fw-semibold">Email:</Form.Label>
                        <div className="col-sm-8">
                            <div>{userData.email}</div>
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-4 fw-semibold">Date of Birth:</Form.Label>
                        <div className="col-sm-8">
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
                                <div>{userData.dob}</div>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-4 fw-semibold">Address:</Form.Label>
                        <div className="col-sm-8">
                            {editMode ? (
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={formValues.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                />
                            ) : (
                                <div>{userData.address}</div>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-4 fw-semibold">Phone:</Form.Label>
                        <div className="col-sm-8">
                            {editMode ? (
                                <Form.Control
                                    type="tel"
                                    value={formValues.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                />
                            ) : (
                                <div>{userData.phone}</div>
                            )}
                        </div>
                    </Form.Group>

                </Form>
            </Card.Body>
        </Card>
    );
};

export default MyProfile;
