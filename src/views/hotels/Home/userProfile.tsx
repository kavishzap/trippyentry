import { useEffect, useState } from 'react';
import { Form, Spinner, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
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

            // Try to fetch from user_profiles table as well
            const { data: profileData } = await supabase
                .from('user_profiles')
                .select('phone, first_name, last_name')
                .eq('id', user.id)
                .single();

            const profile = {
                firstName: profileData?.first_name || user_metadata.firstName || '',
                lastName: profileData?.last_name || user_metadata.lastName || '',
                email: user.email || '',
                dob: user_metadata.dob || '',
                address: user_metadata.address || '',
                phone: profileData?.phone || user_metadata.phone || '',
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

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            setSaving(false);
            Swal.fire('Error', 'Failed to get user information.', 'error');
            return;
        }

        // Update auth metadata
        const { error: authError } = await supabase.auth.updateUser({
            data: {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                dob: formValues.dob,
                address: formValues.address,
                phone: formValues.phone,
            },
        });

        if (authError) {
            setSaving(false);
            Swal.fire('Error', 'Failed to update profile.', 'error');
            return;
        }

        // Update user_profiles table
        const { error: profileError } = await supabase
            .from('user_profiles')
            .update({
                first_name: formValues.firstName,
                last_name: formValues.lastName,
                phone: formValues.phone,
            })
            .eq('id', user.id);

        setSaving(false);

        if (profileError) {
            Swal.fire('Warning', 'Profile updated but database sync failed.', 'warning');
        } else {
            setUserData(formValues);
            setEditMode(false);
            Swal.fire('Success', 'Profile updated successfully.', 'success');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5 trippy-dash-panel">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    return (
        <div className="trippy-dash-panel">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                    <h2 className="trippy-dash-title mb-0">My Profile</h2>
                    <OverlayTrigger
                        overlay={
                            <Tooltip>
                                {editMode ? 'Save your changes' : 'Edit your profile'}
                            </Tooltip>
                        }
                    >
                        <button
                            type="button"
                            onClick={editMode ? handleSave : () => setEditMode(true)}
                            disabled={saving}
                            className="trippy-dash-btn trippy-cta-frost px-4"
                        >
                            {saving ? 'Saving...' : editMode ? 'Save' : 'Edit'}
                        </button>
                    </OverlayTrigger>
                </div>

                <Form>
                    <Row className="mb-3">
                        <Form.Label column sm={4} className="trippy-dash-label">
                            First Name
                        </Form.Label>
                        <Col sm={8}>
                            {editMode ? (
                                <Form.Control
                                    type="text"
                                    value={formValues.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                />
                            ) : (
                                <div className="pt-1 trippy-dash-value">{userData.firstName}</div>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm={4} className="trippy-dash-label">
                            Last Name
                        </Form.Label>
                        <Col sm={8}>
                            {editMode ? (
                                <Form.Control
                                    type="text"
                                    value={formValues.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                />
                            ) : (
                                <div className="pt-1 trippy-dash-value">{userData.lastName}</div>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm={4} className="trippy-dash-label">
                            Email
                        </Form.Label>
                        <Col sm={8}>
                            <div className="pt-1 trippy-dash-value text-break">{userData.email}</div>
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

                    <Row className="mb-3">
                        <Form.Label column sm={4} className="trippy-dash-label">
                            Phone
                        </Form.Label>
                        <Col sm={8}>
                            {editMode ? (
                                <Form.Control
                                    type="tel"
                                    value={formValues.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder="Enter phone number"
                                />
                            ) : (
                                <div className="pt-1 trippy-dash-value">{userData.phone || 'Not provided'}</div>
                            )}
                        </Col>
                    </Row>
                </Form>
        </div>
    );
};

export default MyProfile;
