import React from 'react';
import { Input } from '../ui/input';

interface AdminCredentialsFormFieldsProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  profileName: string;
  setProfileName: (val: string) => void;
  pin: string;
  setPin: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
}

export const AdminCredentialsFormFields: React.FC<AdminCredentialsFormFieldsProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  profileName,
  setProfileName,
  pin,
  setPin,
  message,
  setMessage,
}) => {
  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-zinc-700 font-bold mb-1">Email / Username Akun *</label>
        <Input
          type="text"
          required
          placeholder="premium.user@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-zinc-200 text-zinc-900 focus-visible:ring-zinc-950"
        />
      </div>

      <div>
        <label className="block text-zinc-700 font-bold mb-1">Password Akun *</label>
        <Input
          type="text"
          required
          placeholder="password1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-zinc-200 text-zinc-900 focus-visible:ring-zinc-950"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-700 font-bold mb-1">Nama Profil (Opsional)</label>
          <Input
            type="text"
            placeholder="Profil 1"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="border-zinc-200 text-zinc-900 focus-visible:ring-zinc-950"
          />
        </div>
        <div>
          <label className="block text-zinc-700 font-bold mb-1">PIN Profil (Opsional)</label>
          <Input
            type="text"
            placeholder="1234"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border-zinc-200 text-zinc-900 focus-visible:ring-zinc-950"
          />
        </div>
      </div>

      <div>
        <label className="block text-zinc-700 font-bold mb-1">Pesan / Instruksi Login</label>
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs resize-none"
        />
      </div>
    </div>
  );
};
