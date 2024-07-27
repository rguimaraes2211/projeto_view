<template>
    <div class="container">
        <div>
            <fieldset class="login-fieldset">
                <i class="fa-solid fa-user-plus fa-2xl"></i>
                <h2>CADASTRO DE USUÁRIO</h2>
                <div class="form-group">
                    <span class="input-icon">
                        <i class="fa fa-user"></i>
                        <input type="text" id="nome" v-model="nome" placeholder="Nome" required>
                    </span>
                </div>
                <div class="form-group">
                    <span class="input-icon">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="text" id="email" v-model="email" placeholder="E-mail" required>
                    </span>
                </div>
                <div class="form-group">
                    <span class="input-icon">
                        <i class="fa fa-lock"></i>
                        <input type="password" id="senha" v-model="senha" placeholder="Senha" required>
                    </span>
                </div>
                <button type="submit" @click="cadastrar" class="login-button">CADASTRAR</button>
            </fieldset>
            <div class="cadastro-button">
                <button @click="redirecionaLogin">VOLTAR</button>
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
    name: 'CadastroUsuarioForm',
    data() {
        return {
            nome: '',
            email: '',
            senha: ''
        };
    },
    methods: {
        cadastrar() {
            if(this.nome == ""){
                Swal.fire({
                    title: 'Insira um nome para o usuário!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            if(this.email == ""){
                Swal.fire({
                    title: 'Insira um e-mail para o usuário!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!regex.test(this.email)){
                Swal.fire({
                    title: 'Insira um email válido para o usuário!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            if(this.senha == ""){
                Swal.fire({
                    title: 'Insira uma senha para o usuário!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            if(this.senha.length < 6){
                Swal.fire({
                    title: 'A senha deve conter ao menos 6 dígitos!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            axios.post('/api/cadastro_usuario', {
                nome: this.nome,
                email: this.email,
                senha: this.senha
            })
                .then(response => {
                    if (response.data.status) {
                        Swal.fire({
                            title: response.data.msg,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.redirecionaLogin();
                            }
                        });
                        
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
                        title: "Erro ao cadastrar usuário: " + error.response.data.msg,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                });
        },
        redirecionaLogin() {
            this.$router.push('/login');
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
    border-top-left-radius: 0;
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
