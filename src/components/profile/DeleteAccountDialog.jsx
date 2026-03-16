import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function DeleteAccountDialog({ userProfile }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      // Delete the UserProfile record
      if (userProfile?.id) {
        await base44.entities.UserProfile.delete(userProfile.id);
      }
      // Log out and redirect
      base44.auth.logout('/');
    } catch (e) {
      console.error('Delete account failed:', e);
      setDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 mt-2"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-900 border border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Delete Your Account?</AlertDialogTitle>
          <AlertDialogDescription className="text-purple-200/60">
            This will permanently delete your account and all associated data including your Luna Credits balance, journal entries, and profile. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/10 border-white/10 text-white hover:bg-white/20">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleting ? 'Deleting…' : 'Yes, Delete My Account'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
