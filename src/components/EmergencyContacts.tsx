import { Plus, Phone, Trash2, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface EmergencyContactsProps {
  contacts: Contact[];
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onRemoveContact: (id: string) => void;
}

export const EmergencyContacts = ({ 
  contacts, 
  onAddContact, 
  onRemoveContact 
}: EmergencyContactsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      onAddContact(newContact);
      setNewContact({ name: '', phone: '', relationship: '' });
      setIsAdding(false);
    }
  };

  return (
    <Card className="mx-6 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Emergency Contacts
          </span>
          {!isAdding && contacts.length < 3 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
                {contact.relationship && (
                  <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveContact(contact.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {isAdding && (
          <div className="p-4 border border-dashed border-border rounded-lg space-y-3">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Contact name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={newContact.phone}
                onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship (Optional)</Label>
              <Input
                id="relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                placeholder="e.g., Mother, Friend, Partner"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddContact} size="sm">
                Add Contact
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setIsAdding(false);
                  setNewContact({ name: '', phone: '', relationship: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {contacts.length === 0 && !isAdding && (
          <div className="text-center py-6 text-muted-foreground">
            <UserCheck className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No emergency contacts added yet</p>
            <p className="text-sm">Add up to 3 trusted contacts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};