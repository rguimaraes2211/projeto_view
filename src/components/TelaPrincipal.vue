<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar">
            <button type="button" class="tela-button" @click="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                Logout
            </button>
            <div class="navbar-left">
                <h2>Olá {{ nomeUsuario }}!</h2>
            </div>
            <div class="navbar-right">
                <button type="button" class="tela-button" @click="mostrarModalFiltro = true">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    Filtro
                </button>
                <button type="button" class="tela-button" @click="mostrarModalCadastro = true">
                    <i class="fa-solid fa-user-plus"></i>
                    Novo Cliente
                </button>
            </div>
        </nav>

        <!-- Modal para o filtro -->
        <div v-if="mostrarModalFiltro" class="modal fade show d-block" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="mostrarModalFiltro = false">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <fieldset class="login-fieldset">
                            <h2>FILTROS</h2>
                            <form @submit.prevent="aplicarFiltro">
                                <div class="form-group input-icon">
                                    <label for="nome">Nome</label>
                                    <input type="text" class="form-control" id="nome" v-model="filtros.nome" />
                                </div>
                                <div class="form-group input-icon">
                                    <label for="cpf">CPF</label>
                                    <input type="text" class="form-control" id="cpf" v-mask="'###.###.###-##'"
                                        v-model="filtros.cpf" />
                                </div>
                                <div class="form-group input-icon">
                                    <label for="idade">Idade</label>
                                    <input type="number" class="form-control" id="idade" v-model="filtros.idade" />
                                </div>
                                <div class="form-group input-icon">
                                    <label for="cidade">Cidade</label>
                                    <select class="form-control" id="cidade" v-model="filtros.cidade">
                                        <option v-for="cidade in cidades" :key="cidade.id" :value="cidade.nome">{{
                                            cidade.nome }}</option>
                                    </select>
                                </div>
                                <div class="form-group input-icon">
                                    <label for="estado">Estado</label>
                                    <select class="form-control" id="estado" v-model="filtros.estado"
                                        @change="buscarCidadesParaFiltro">
                                        <option v-for="estado in estados" :key="estado.id" :value="estado.nome">{{
                                            estado.nome }}</option>
                                    </select>
                                </div>
                                <div class="cadastro-button">
                                    <button type="submit" class="tela-button">Aplicar Filtro</button>
                                </div>
                            </form>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-backdrop fade show" v-if="mostrarModalFiltro"></div>

        <!-- Modal para o cadastro de usuário -->
        <div v-if="mostrarModalCadastro" class="modal fade show d-block" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="mostrarModalCadastro = false">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <fieldset class="login-fieldset">
                            <h2>CADASTRO DE USUÁRIO</h2>
                            <form @submit.prevent="cadastrarCliente">
                                <div class="form-group input-icon">
                                    <label for="nome">Nome</label>
                                    <input type="text" class="form-control" id="nome" v-model="usuario.nome" required />
                                </div>
                                <div class="form-group input-icon">
                                    <label for="cpf">CPF</label>
                                    <input type="text" class="form-control" id="cpf" v-model="usuario.cpf"
                                        v-mask="'###.###.###-##'" required />
                                </div>
                                <div class="form-group input-icon">
                                    <label for="nascimento">Nascimento</label>
                                    <input type="date" class="form-control" id="nascimento"
                                        v-model="usuario.nascimento" />
                                </div>
                                <div class="form-group input-icon">
                                    <label for="telefone">Telefone</label>
                                    <input type="text" class="form-control" id="telefone" v-model="usuario.telefone"
                                        v-mask="'(##) #####-####'" />
                                </div>
                                <div class="form-group input-icon">
                                    <label for="uf">UF</label>
                                    <select class="form-control" id="uf" v-model="usuario.uf" @change="buscarCidades">
                                        <option v-for="estado in estados" :key="estado.id" :value="estado.nome">{{
                                            estado.nome }}</option>
                                    </select>
                                </div>
                                <div class="form-group input-icon">
                                    <label for="cidade">Cidade</label>
                                    <select class="form-control" id="cidade" v-model="usuario.cidade">
                                        <option v-for="cidade in cidades" :key="cidade.id" :value="cidade.nome">{{
                                            cidade.nome }}</option>
                                    </select>
                                </div>
                                <div class="form-group input-icon">
                                    <label for="foto">Foto</label>
                                    <input type="file" class="form-control" id="foto" @change="tratarArquivoUpload"
                                        accept="image/*" required />
                                </div>
                                <div class="cadastro-button">
                                    <button type="submit" class="tela-button">Cadastrar</button>
                                </div>
                            </form>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-backdrop fade show" v-if="mostrarModalCadastro"></div>

        <!-- Tabela de Clientes -->
        <div class="container">
            <table id="clientesTable" class="display">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Nascimento</th>
                        <th>Idade</th>
                        <th>Telefone</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            mostrarModalFiltro: false,
            mostrarModalCadastro: false,
            filtros: {
                nome: '',
                cpf: '',
                idade: '',
                cidade: '',
                estado: ''
            },
            usuario: {
                nome: '',
                cpf: '',
                nascimento: '',
                telefone: '',
                uf: '',
                cidade: '',
                foto: null
            },
            estados: [],
            cidades: [],
            nomeUsuario: localStorage.getItem('usuario') || 'Usuário',
            clientes: [],
            editando: false,
            idClienteParaEditar: null
        };
    },
    created() {
        this.buscarEstados();
        this.buscarClientes(); 
    },
    mounted() {
        this.$nextTick(() => {
            this.initDataTable();
        });
    },
    methods: {
        aplicarFiltro() {
            console.log('Filtros aplicados:', this.filtros);
            this.mostrarModalFiltro = false;
            this.buscarClientes(); 
        },
        cadastrarCliente() {
            const formData = new FormData();
            formData.append('nome', this.usuario.nome);
            formData.append('cpf', this.usuario.cpf);
            formData.append('nascimento', this.usuario.nascimento);
            formData.append('telefone', this.usuario.telefone);
            formData.append('estado', this.usuario.uf);
            formData.append('cidade', this.usuario.cidade);
            formData.append('foto', this.usuario.foto);

            if (this.editando) {
                axios.post(process.env.VUE_APP_API_URL+`edita_cliente/${this.idClienteParaEditar}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function () {
                    Swal.fire({
                        title: "Cliente atualizado com sucesso!",
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }).catch(error => {
                    Swal.fire({
                        title: "Erro ao atualizar cliente: " + error.response.data.msg,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                });
            } else {
                axios.post(process.env.VUE_APP_API_URL+'cadastro_cliente', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(response => {
                    Swal.fire({
                        title: response.data.msg,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }).catch(error => {
                    Swal.fire({
                        title: "Erro ao cadastrar cliente: " + error.response.data.msg,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                });
            }
        },
        buscarEstados() {
            axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
                .then(resposta => {
                    this.estados = resposta.data.map(estado => ({
                        id: estado.id,
                        nome: estado.nome
                    }));
                });
        },
        buscarCidades() {
            const estadoId = this.estados.find(estado => estado.nome === this.usuario.uf).id;
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
                .then(resposta => {
                    this.cidades = resposta.data.map(cidade => ({
                        id: cidade.id,
                        nome: cidade.nome
                    }));
                });
        },
        buscarCidadesParaFiltro() {
            const estadoId = this.estados.find(estado => estado.nome === this.filtros.estado).id;
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
                .then(resposta => {
                    this.cidades = resposta.data.map(cidade => ({
                        id: cidade.id,
                        nome: cidade.nome
                    }));
                });
        },
        tratarArquivoUpload(event) {
            const arquivo = event.target.files[0];
            if (arquivo) {
                if (!arquivo.type.startsWith('image/')) {
                    Swal.fire({
                        title: 'Por favor, selecione um arquivo de imagem.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    event.target.value = '';
                } else {
                    this.usuario.foto = arquivo;
                }
            }
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            this.$router.push('/login');
        },
        buscarClientes() {
            axios.post(process.env.VUE_APP_API_URL+'busca_clientes', { params: this.filtros })
                .then(response => {
                    this.clientes = response.data.users;
                    this.initDataTable();
                })
                .catch(error => {
                    console.error("Erro ao buscar clientes:", error);
                });
        },
        initDataTable() {
            if ($.fn.DataTable.isDataTable('#clientesTable')) {
                $('#clientesTable').DataTable().clear().destroy();
            }

            const self = this;

            $('#clientesTable').DataTable({
                data: this.clientes,
                columns: [
                    { data: 'id' },
                    { data: 'foto', render: data => `<img src="/storage/${data}" alt="Foto" width="50" height="50">` },
                    { data: 'nome' },
                    { data: 'cpf' },
                    { data: 'nascimento' },
                    { data: 'idade' },
                    { data: 'telefone' },
                    { data: 'cidade' },
                    { data: 'estado' },
                    { data: null, defaultContent: '<a href="#" class="edit-action" title="Editar"><i class="fa-solid fa-pen-to-square" style="color: #6959CD;"></i></a>&nbsp;&nbsp;&nbsp;<a href="#" class="delete-action" title="Excluir"><i class="fa fa-trash" style="color: tomato;"></i></a>' }
                ],
            });

            $('#clientesTable tbody').off('click', 'a.edit-action');
            $('#clientesTable tbody').on('click', 'a.edit-action', function (event) {
                event.preventDefault();
                const data = $('#clientesTable').DataTable().row($(this).parents('tr')).data();
                self.editar(data.id);
            });

            $('#clientesTable tbody').off('click', 'a.delete-action');
            $('#clientesTable tbody').on('click', 'a.delete-action', function () {
                const data = $('#clientesTable').DataTable().row($(this).parents('tr')).data();
                self.excluir(data.id);
            });
        },
        resetarFormulario() {
            this.usuario = {
                nome: '',
                cpf: '',
                nascimento: '',
                telefone: '',
                uf: '',
                cidade: '',
                foto: null
            };
            this.editando = false;
            this.idClienteParaEditar = null;
        },
        editar(id) {
            axios.get(process.env.VUE_APP_API_URL+`busca_cliente_id/${id}`)
                .then(response => {
                    const cliente = response.data;
                    this.usuario.nome = cliente.nome;
                    this.usuario.cpf = cliente.cpf;
                    this.usuario.nascimento = cliente.nascimento;
                    this.usuario.telefone = cliente.telefone;
                    this.usuario.uf = cliente.estado;
                    this.buscarCidades()
                    this.usuario.cidade = cliente.cidade;
                    
                    this.usuario.foto = null; 

                    this.idClienteParaEditar = id;
                    this.editando = true;
                    this.mostrarModalCadastro = true;
                })
                .catch(error => {
                    console.error('Erro ao buscar cliente:', error);
                });
        },
        excluir(id) {
            Swal.fire({
                title: "Você tem certeza que deseja excluir?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#6959CD",
                cancelButtonColor: "tomato",
                confirmButtonText: "Sim",
                cancelButtonText: "Não"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(process.env.VUE_APP_API_URL+`excluir_clientes/${id}`)
                        .then(response => {
                            if (response.data.status) {
                                Swal.fire({
                                    title: "Excluído com sucesso!",
                                    icon: "success",
                                    confirmButtonColor: "#3085d6",
                                    confirmButtonText: "Ok"
                                }).then(function () {
                                    window.location.reload()
                                })
                            } else {
                                Swal.fire({
                                    title: "Erro ao excluir!",
                                    icon: "error",
                                    confirmButtonColor: "#3085d6",
                                    confirmButtonText: "Ok"
                                });
                            }
                        });
                }
            });
        }
    }
};
</script>

<style scoped>
.modal.fade.show {
    display: block;
    background: rgba(0, 0, 0, 0.5);
}

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

.tela-button {
    background-color: gray;
    border-radius: 8px;
    width: 200px;
    padding: 10px 20px;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    margin-inline: 3px;
}

.tela-button:hover {
    background-color: #6959CD;
}

.actions-icon {
    color: #6959CD !important;
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

.navbar {
    background-color: lightgray;
}
</style>
