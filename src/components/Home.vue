<!-- osnovna stranica unutar body -->
<template>
    <div  class="container">
        <div class="row">
            <h2 style="padding-top: 2rem; padding-left: 2rem; padding-bottom: 0.5rem;" v-on:click="sortOn">Transformers</h2>
        </div>
        <div class="row">
            <router-link v-bind:to="{name: 'add'}" style="color: white; margin-left: 2rem; padding-bottom: 0.5rem;">Add new</router-link>
        </div>
            <!-- listing prema abecedi ili kronološki, ovisno da li je 'sorted' false ili true, klikni na 'Transformers' -->
           <div class="row" v-for="item in decide" v-bind:key="item.id">   
           <div class="col col-sm-3">
                <div class="card" style="width: 28rem;">
                    <div class="card-body">  <!-- ako factions nije unesen (prva tri default unosa), povećaj razmak dolje -->
                        
                        <h5 class="card-title" v-if="item.factions" style="margin-bottom: 0rem;">
                            <router-link :to="{ name: 'edit', params: { 
                                ajdi: item.id, 
                                ime: item.name,
                                grupa: item.vehicleGroup,
                                tip: item.vehicleType,
                                model: item.vehicleModel,
                                oprema: item.gear,
                                gang: item.factions  
                                } }">{{item.name}}</router-link>
                        </h5>
                        <h5 class="card-title" v-else style="margin-bottom: 1rem;">
                            <router-link :to="{ name: 'edit', params: {
                                ajdi: item.id, 
                                ime: item.name,
                                grupa: item.vehicleGroup,
                                tip: item.vehicleType,
                                model: item.vehicleModel,
                                oprema: item.gear,
                                gang: item.factions  
                                 } }">{{item.name}}</router-link>    
                        </h5>

                        <small id="factionsId" v-if="item.factions" style="margin-top: 0rem; padding-bottom: 1rem;" class="form-text text-muted">{{item.factions}}</small>
                        <h6 class="card-subtitle mb-2 text-muted" style="padding-bottom: 0.1rem;">Vehicle Group - {{item.vehicleGroup}}</h6>
                        <h6 class="card-subtitle mb-2 text-muted" style="padding-bottom: 0.1rem;">Vehicle Type - {{item.vehicleType}}</h6>
                        <h6 class="card-subtitle mb-2 text-muted" v-if="item.vehicleModel" style="padding-bottom: 0.1rem;">Vehicle Model - {{'&#8482;' + item.vehicleModel}}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Gear  <span v-for="weapon in item.gear" v-bind:key="weapon.id">{{'&#8226;' + weapon + ' '}}</span></h6>
                        
                        <!-- mijenja boju prikaza ovisno o statusu -->
                        <p class="card-text">Status <b><span v-bind:style="[item.status === 'INJURED' ? {color: transtatusinjured} : {color: transtatusok}]">{{item.status}}</span></b></p>

                        <a href="#" class="card-link" v-on:click="updateStatus3(item, 'OK')">OK</a>
                        <a href="#" class="card-link" v-on:click="updateStatus3(item, 'INJURED')">INJURED</a>
                        <a href="#" class="card-link" v-on:click="updateStatus3(item, 'MIA')">MIA</a>
                    </div>
                </div>
                <br>

            </div> <!-- end of col -->

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';  // za sortanje po imenu u Vue 2 (promijenjeno)

    export default {
        name: 'home',
        data() {
            return {
                trans: [],  // učitani Transformeri
                sortBool: false,   // bool da li je kliknuo 'Transformers' za sortanje
                transtatusok: 'green',  // status za OK i MIA
                transtatusinjured: 'red'  // status za INJURED
            }
        },
        methods: {
            loadItems() {   // napuni Transformere
                axios.get('/api')
                .then(response => {  // arrow function da ne treba var this = self
                    this.trans = response.data.transformers;
                })
                .catch(error => {
                    console.log('Greška kod učitavanja: ' + error);
                })
            },
            updateStatus3(data, value) {  // updataj status
                axios.post('/api', {data, value})
                .then(response => {  
                    console.log('server primio status');
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.loadItems(); // kada callback dobavi nove podatke, učitaj ponovo
            },
            sortOn() {
                this.sortBool = !this.sortBool;
            }
        },
        mounted() { // prikaži Transformere kod učitavanja stranice (mounted Vue faza)
            this.loadItems();
        },
        computed: {
            sorted: function() { // za sortanje prema imenu itema, u Vue 2 treba sa lodash
                return _.orderBy(this.trans, 'name');
            },
            decide: function() {  // koji će izvor podataka prikazati..
                if (this.sortBool) {   // sorted ili chronological
                    return this.sorted;
                } else {
                    return this.trans.slice().reverse();  // zadnji unos ide prvi.. chrono 
                }
            }
        }
    }
</script>

<style scoped>


</style>