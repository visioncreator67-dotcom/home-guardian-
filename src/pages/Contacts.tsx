import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  priority: number;
}

export default function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '', priority: 3 });

  // Load contacts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('emergencyContacts');
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  // Save contacts to localStorage  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) return;
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact,
      priority: Number(newContact.priority),
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '', relationship: '', priority: 3 });
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const testAlert = (phone: string) => {
    alert(`[TEST] Emergency alert would be sent to ${phone}`);
    // In production, integrate with SMS service (Twilio, etc.)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Emergency Contacts</h2>

        {/* Add Contact Form */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Add New Contact</h3>
          <input
            type="text"
            placeholder="Full name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
          />
          <input
            type="tel"
            placeholder="Phone number (with country code)"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
          />
          <input            type="text"
            placeholder="Relationship (e.g., Mother, Friend)"
            value={newContact.relationship}
            onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
          />
          <select
            value={newContact.priority}
            onChange={(e) => setNewContact({ ...newContact, priority: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
          >
            <option value={1}>Priority 1 (Primary)</option>
            <option value={2}>Priority 2 (Secondary)</option>
            <option value={3}>Priority 3 (Tertiary)</option>
          </select>
          <button            onClick={addContact}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Add Contact
          </button>
        </div>

        {/* Contact List */}
        {contacts.length === 0 ? (
          <p className="text-gray-500 text-center">No emergency contacts yet. Add your first contact above.</p>
        ) : (
          <ul className="space-y-3">
            {contacts.sort((a,b) => a.priority - b.priority).map(contact => (
              <li key={contact.id} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-gray-500">{contact.phone}</div>
                  <div className="text-xs text-gray-400">{contact.relationship}</div>
                  <div className="text-xs font-semibold mt-1">
                    Priority: {contact.priority === 1 ? '🔴 Primary' : contact.priority === 2 ? '🟠 Secondary' : '🟢 Tertiary'}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => testAlert(contact.phone)}
                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                  >
                    Test Alert
                  </button>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Button
          onClick={() => navigate('/dashboard')}
          className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-lg"
        >
          ← Back to Dashboard
        </Button>
      </div>
    </div>
  );
}