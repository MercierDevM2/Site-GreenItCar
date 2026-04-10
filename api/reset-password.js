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

  const { email, newPassword } = req.body;

  // ✅ Vérifier les champs
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Mot de passe trop court (min 6 caractères)' });
  }

  try {
    // 🔥 Étape 1 : Récupérer l'utilisateur par email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('Erreur listUsers:', userError);
      return res.status(500).json({ error: 'Erreur lors de la recherche utilisateur' });
    }

    const user = userData.users.find(u => u.email === email);
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // 🔥 Étape 2 : Mettre à jour le mot de passe
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Erreur updateUserById:', updateError);
      return res.status(400).json({ error: updateError.message });
    }

    return res.status(200).json({ success: true, message: 'Mot de passe mis à jour' });
  } catch (err) {
    console.error('Erreur serveur:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
