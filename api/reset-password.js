import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // ✅ Vérifier la méthode
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, newPassword, resetToken } = req.body;

  // ✅ Vérifier les champs
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Mot de passe trop court' });
  }

  try {
    // ✅ Mettre à jour le mot de passe avec le service role
    const { error } = await supabase.auth.admin.updateUserByEmail(email, {
      password: newPassword
    });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}