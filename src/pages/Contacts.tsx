import { useState } from 'react';
import { useRouter } from 'react-router-dom';
import { Button, Card, Input, Select, Table } from '../components/ui';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  priority: number; // 1 = primary
}

const initialContacts: Contact[] = [
  { id: '1', name: 'John Doe', phone: '+1234567890', relationship: 'Spouse', priority: 1 },
  { id: '2', name: 'Jane Smith', phone: '+0987654321', relationship: 'Parent', priority: 2 }
];

export default function Contacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState(initialContacts);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '', priority: 3 });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) return;
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '', relationship: '', priority: 3 });
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleTestAlert = (phone: string) => {
    alert(`Test alert sent to ${phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Emergency Contacts</h2>
        <div className="mb-6">
          <div className="mb-4">
            <Input
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="mb-2 w-full"
            />
            <Input
              placeholder="Phone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="mb-2 w-full"
            />
            <Input
              placeholder="Relationship"
              value={newContact.relationship}
              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              className="mb-2 w-full"
            />
            <Select
              placeholder="Priority"
              value={newContact.priority}
              onChange={(e) => setNewContact({ ...newContact, priority: Number(e.target.value) })}
              options={[
                { value: 1, label: 'Primary' },
                { value: 2, label: 'Secondary' },
                { value: 3, label: 'Tertiary' }
              ]}
              className="w-full mb-4"
            />
          </div>
          <Button variant="outline" onClick={handleAddContact} className="w-full">
            Add Contact
          </Button>
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>Phone</Table.Cell>
              <Table.Cell>Relationship</Table.Cell>
              <Table.Cell>Priority</Table.Cell>
              <Table.Cell>Actions</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {contacts.map(contact => (
              <Table.Row key={contact.id}>
                <Table.Cell>{contact.name}</Table.Cell>
                <Table.Cell>{contact.phone}</Table.Cell>
                <Table.Cell>{contact.relationship}</Table.Cell>
                <Table.Cell>
                  {contact.priority === 1 && 'Primary'}
                  {contact.priority === 2 && 'Secondary'}
                  {contact.priority === 3 && 'Tertiary'}
                </Table.Cell>
                <Table.Cell>
                  <Button variant="outline" size="sm" onClick={() => handleTestAlert(contact.phone)}>
                    Test
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2" onClick={() => handleDeleteContact(contact.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}