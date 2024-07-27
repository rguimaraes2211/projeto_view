<template>
    <div class="container">
        <div>
            <fieldset class="login-fieldset">
                <i class="fa-solid fa-circle-user fa-2xl icon-tela"></i>
                <h2>LOGIN</h2>
                <div class="form-group">
                    <span class="input-icon">
                        <i class="fa fa-user"></i>
                        <input type="text" id="email" v-model="email" placeholder="E-mail" required>
                    </span>
                </div>
                <div class="form-group">
                    <span class="input-icon">
                        <i class="fa fa-lock"></i>
                        <input type="password" id="senha" v-model="senha" placeholder="Senha" required>
                    </span>
                </div>
                <button type="submit" @click="login" class="login-button">LOGIN</button>
            </fieldset>
            <div class="cadastro-button">
                <button @click="redirecionaCadastro">CADASTRAR</button>
            </div>
            <div v-if="error">
                <p>{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            senha: '',
            loggedIn: false,
            error: ''
        };
    },
    methods: {
        login() {
            axios.post('/api/login', {
                email: this.email,
                senha: this.senha
            })
                .then(response => {
                    if(response.data.status == true){
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('usuario', response.data.user.nome);
                        this.$router.push('/tela_principal');
                    } else {
                        Swal.fire({
                            title: response.data.msg,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: error,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                });
        },
        redirecionaCadastro() {
            this.$router.push('/cadastro_usuario');
        }
    }
};
</script>

<style scoped>
.login-fieldset {
    border: 1px solid #ccc;
    padding: 40px;
    background-color: #f0f0f0;
    margin-bottom: 2px;
    border-radius: 8px;
}

.login-fieldset legend {
    font-size: 0.9rem;
    color: #333;
    padding: 0 10px;
}

.form-group {
    margin-bottom: 15px;
}

.input-icon {
    position: relative;
}

.input-icon i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
}

h2 {
    color: gray;
}

.icon-tela {
    color: gray;
}

.input-icon input {
    padding-left: 30px;
    width: 100%;
    font-size: 1rem;
    border: 1px solid #ddd;
    height: 40px;
    box-sizing: border-box;
}

.login-button {
    background-color: gray;
    border-radius: 8px;
    width: 200px;
    padding: 10px 20px;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.login-button:hover {
    background-color: #6959CD;
}

.cadastro-button {
    text-align: center;
}

.cadastro-button button {
    padding: 10px 20px;
    background-color: gray;
    border-radius: 8px;
    /* Arredonda todos os cantos */
    border-top-left-radius: 0;
    /* Remove o border-radius da parte inferior esquerda */
    border-top-right-radius: 0;
    width: 180px;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.cadastro-button button:hover {
    background-color: #6959CD;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
