'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function MembersInfo() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/members');
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="members-loading">Loading members...</div>;
  }

  if (error) {
    return <div className="members-error">Error: {error}</div>;
  }

  return (
    <div className="members-info">
      <div className="members-header">
        <h1>Members</h1>
        <Button variant="default">Add Member</Button>
      </div>

      {members.length === 0 ? (
        <Card className="empty-state">
          <p>No members found. Start by adding a new member.</p>
        </Card>
      ) : (
        <div className="members-grid">
          {members.map((member) => (
            <Card key={member.id} className="member-card">
              <div className="member-avatar">
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-email">{member.email}</p>
                <p className="member-role">{member.role || 'Member'}</p>
                <p className="member-date">
                  Joined {new Date(member.joinedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="member-actions">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="delete-btn">Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
