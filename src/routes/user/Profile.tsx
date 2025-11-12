import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import type User from '../../types/user.type';

export default function ProfilePage(): JSX.Element {
  const { user } = useAuth();

  const [profile, setProfile] = useState<{
    fullName: string;
    email: string;
    profileImage: string | null;
    file?: File | null;
  }>(() => ({
    fullName: user?.fullName ?? '',
    email: user?.email ?? '',
    profileImage: (user as User | undefined)?.profileImage ?? null,
    file: null,
  }));

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | null;
    text?: string;
  }>({ type: null });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const resp = await api.get<Partial<User>>(`/users/me/`);
        if (!mounted) return;
        const data = resp.data || {};
        setProfile((p) => ({
          ...p,
          fullName: data.fullName ?? p.fullName,
          email: data.email ?? p.email,
          profileImage: data.profileImage ?? p.profileImage,
        }));
      } catch (err) {
        console.debug('Could not fetch /users/me', err);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, file, profileImage: previewUrl }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null });

    try {
      const formData = new FormData();
      formData.append('fullName', profile.fullName);
      formData.append('email', profile.email);
      if (profile.file) {
        // FIX: Change 'profileImage' to 'avatar' to match the Multer configuration
        formData.append('avatar', profile.file);
      }

      const res = await api.patch(`/users/me?${user?._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProfile((p) => ({
        ...p,
        profileImage: res.data?.profileImage ?? p.profileImage,
        file: null,
      }));
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err: any) {
      console.error(err);
      const text = err?.response?.data?.message ?? 'Failed to update profile.';
      setMessage({ type: 'error', text });
    } finally {
      setLoading(false);
    }
  };

  const initials = (profile.fullName || '')
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Your profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-xl font-bold">
          {profile.profileImage ? (
            <img
              src={
                profile.profileImage?.startsWith('blob:')
                  ? profile.profileImage // local preview
                  : import.meta.env.VITE_IMAGE_HOST + profile.profileImage // server image
              }
              alt="profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-600">{initials || '?'}</span>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700">Change photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            PNG/JPG up to server's size limit
          </p>
        </div>
      </div>

      <label className="block mb-3">
        <div className="text-sm text-gray-600">Full name</div>
        <input
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      <label className="block mb-3">
        <div className="text-sm text-gray-600">Email</div>
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>

        <button
          type="button"
          onClick={() => {
            setProfile({
              fullName: user?.fullName ?? '',
              email: user?.email ?? '',
              profileImage: (user as User | undefined)?.profileImage ?? null,
              file: null,
            });
            setMessage({ type: null });
          }}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>

      {message.type && (
        <div
          className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          {message.text}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        <div>
          Account id:{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {(user as User | undefined)?._id ?? '—'}
          </code>
        </div>
        <div className="mt-1">
          Created: <span>{(user as User | undefined)?.createdAt ?? '—'}</span>
        </div>
      </div>
    </form>
  );
}
