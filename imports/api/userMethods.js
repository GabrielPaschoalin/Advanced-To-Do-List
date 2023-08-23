import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'user.register'(userData) {

    // Perform user registration logic
    const userId = Accounts.createUser({
      username: userData.username,
      password: userData.password,
      profile: {
        nome: userData.nome,
        dataNascimento: userData.dataNascimento,
        sexo: userData.sexo,
        empresa: userData.empresa,
      },
    });
    return userId;
  },

  'updateUserProfile'(userId, updatedProfile) {
    // Verifique se o usuário está autenticado antes de atualizar o perfil
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to update this profile.');
    }

    // Certifique-se de que o usuário está atualizando seu próprio perfil
    if (this.userId !== userId) {
      throw new Meteor.Error('not-authorized', 'You can only update your own profile.');
    }

    // Realize a atualização do perfil do usuário
    Meteor.users.update(userId, {
      $set: updatedProfile,
    });
  },
});
