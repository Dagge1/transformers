<template>
<div>
    <div class="row">
        <router-link v-bind:to="{name: 'home'}" style="color: white; padding-left: 2rem; padding-top: 0.3rem;">Back</router-link>
    </div>
    <div class="container">
        <div class="row">
            <h2 style="padding-top: 1rem; padding-left: 2rem; padding-bottom: 0.5rem;">Add new</h2>
        </div>

        <div class="row" >
            <div class="col col-sm-3">
                <div class="card" style="width: 28rem;">
                    <div class="card-body">
                                               
                        <form>
                            <div class="form-group">
                                <label for="transName">Name</label>
                                <input type="text" class="form-control" id="transName" v-model="trName" aria-describedby="transName" placeholder="Optimus Prime">
                            </div>
                            
                            <div class="form-group">
                            <label for="vehGroup">Vehicle Group </label>  <!-- kada odabere grupu resetira sve ostale rubrike -->
                                <select v-model="veGroup" @change="resetOthers" class="custom-select" id="vehGroup">
                                    <option disabled value="">Odaberi grupu vozila</option>
                                    <option>Air</option>
                                    <option>Sea</option>
                                    <option>Land</option>
                                </select>
                            </div>
                            
                            <!-- Grupa vozila Air -->
                            <div class="form-group" v-if="veGroup === 'Air'"> <!-- prikaži ako su zračna vozila -->
                            <label for="vehTypeAir">Vehicle Type </label>
                                <select v-model="veTypeAir" class="custom-select" id="vehTypeAir" >
                                    <option disabled value="">Odaberi tip zračnih vozila</option>
                                    <option>Plane</option>
                                    <option>Helicopter</option>
                                </select>
                            </div>
                            
                            <!-- Grupa vozila Sea -->
                            <div class="form-group" v-if="veGroup === 'Sea'"> <!-- prikaži ako su Sea i Land vozila -->
                            <label for="vehTypeSea">Vehicle Type </label> <!-- kada odabere grupu resetira model (ako si mijenjao izbor grupe) -->
                                <select v-model="veTypeSea" @change="resetTypes()" class="custom-select" id="vehTypeSea" >
                                    <option disabled value="">Odaberi tip vodenih vozila</option>
                                    <option>Boat</option>
                                    <option>Submarine</option>
                                </select>
                            </div>

                            <!-- Model vozila Sea > Boat -->
                            <div class="form-group" v-if="veTypeSea === 'Boat'"> <!-- prikaži ako su Sea i Land vozila -->
                            <label for="vehModelSea">Vehicle Model </label>
                                <select v-model="veModelSea" class="custom-select" id="vehModelSea" >
                                    <option disabled value="">Odaberi model vodenog vozila</option>
                                    <option>Sailboat</option>
                                    <option>Jetboat</option>
                                </select>
                            </div>
                            
                            <!-- Model vozila Sea > Sub -->
                            <div class="form-group" v-if="veTypeSea === 'Submarine'"> <!-- prikaži ako su Sea i Land vozila -->
                            <label for="vehModelSeaSub">Vehicle Model </label>
                                <select v-model="veModelSea" class="custom-select" id="vehModelSeaSub" >
                                    <option disabled value="">Odaberi model vodenog vozila</option>
                                    <option>Standard</option>
                                </select>
                            </div>
                            
                            <!-- Grupa vozila Land -->
                            <div class="form-group" v-if="veGroup === 'Land'"> <!-- prikaži ako su Sea i Land vozila -->
                            <label for="vehTypeLand">Vehicle Type </label>
                                <select v-model="veTypeLand" @change="resetTypes()" class="custom-select" id="vehTypeLand" >
                                    <option disabled value="">Odaberi model cestovnog vozila</option>
                                    <option>Car</option>
                                    <option>Truck</option>
                                </select>
                            </div>

                            <!-- Model vozila Land > Car -->
                            <div class="form-group" v-if="veTypeLand === 'Car'"> <!-- prikaži ako su Sea i Land vozila -->
                            <label for="vehModelLand">Vehicle Type </label>
                                <select v-model="veModelLand" class="custom-select" id="vehModelLand" >
                                    <option disabled value="">Odaberi model cestovnog vozila</option>
                                    <option>Camaro</option>
                                    <option>AMG GT R</option>
                                    <option>Lamborghini</option>
                                </select>
                            </div>
                            
                            <!-- Model vozila Land > Truck -->
                            <div class="form-group" v-if="veTypeLand === 'Truck'"> <!-- prikaži ako su Sea i Land vozila -->
                            <label for="vehModelLandTruck">Vehicle Type </label>
                                <select v-model="veModelLand" class="custom-select" id="vehModelLandTruck" >
                                    <option disabled value="">Odaberi model cestovnog vozila</option>
                                    <option>Unimog</option>
                                    <option>Western Star 5700</option>
                                </select>
                            </div>
                            
                            <!-- Gear lista -->
                            <div class="form-group"> 
                                <label for="vehGear">Odaberi ili dodaj opremu (odvajaj zarezom)</label>
                                    <input type="text" class="form-control" id="vehGear" aria-describedby="vehGear" v-model="gear">
                                    <!-- v-model u input preuzima iteme iz [] gear + moguće ih je mijenjati, sa v-bind:value=".." nije moguće -->
                            </div>


                            <!-- Factions radiobutton -->
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="picked" name="exampleRadios" id="exampleRadios1" value="Autobots">
                                <label class="form-check-label" for="exampleRadios1">
                                    Autobots
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="picked" name="exampleRadios" id="exampleRadios2" value="Decepticons">
                                <label class="form-check-label" for="exampleRadios2">
                                    Decepticons
                                </label>
                            </div>
                            

                            <div class="form-group" style="margin-top: 1rem;">
                                <button type="submit" class="btn btn-primary" v-on:click.prevent="createNew">Kreiraj</button>
                            </div>
                        </form>
                        
                       
                    </div>
                </div>
                <br>

            </div> <!-- end of col -->

        </div>



    </div>
</div>    
</template>

<script>
//import 'bootstrap/scss/bootstrap.scss'; 
import axios from 'axios';

    export default {
        name: 'add',
        data() {
            return {
                trans: [],  // učitani Transformeri
                gear: ['cannon', 'machine gun', 'shield', 'sword'], 
                picked: 'Autobots',  // radio.. default je Autobots
                trName: '', // ime Transformera
                veGroup: '', // vehicle group
                veTypeAir: '',  // tip ako je vehicle group Air
                veTypeSea: '',  // tip Sea vozila 
                veModelSea: '',  // model Sea vozila 
                veTypeLand: '',  // tip Land vozila
                veModelLand: '',  // model Land vozila
                transtatusok: 'green',  // status za OK i MIA
                transtatusinjured: 'red',  // status za INJURED
            }
        },
        methods: {
            createNew() {  // zapiši novog Transformera
            let vehType, vehModel;
            var gearTemp = this.gear;
            
            if (typeof gearTemp === 'string') { // ako user promijeni default listu oružja..
                gearTemp = this.gear.split(',').map(s => s.trim()); // pretvori string natrag u array, izbaci razmake iz arraya ako je koji iza zareza
            }

            if (this.veGroup === 'Air') { // preuzmi odabranu opciju, ako je Air..
                vehType = this.veTypeAir;
            } else if (this.veGroup === 'Sea') { // Sea..
                vehType = this.veTypeSea;
                vehModel = this.veModelSea;
            }  else if (this.veGroup === 'Land') {  // Land
                vehType = this.veTypeLand;
                vehModel = this.veModelLand;
            }
            let novi = {
                    name: this.trName || 'Default', 
                    vehicleGroup: this.veGroup,  // grupiraj za Sea i Land..
                    vehicleType: vehType,
                    vehicleModel: vehModel,
                    gear: gearTemp,
                    factions: this.picked  // factions radio
                };
                axios.post('/new', novi)  // snimi novi unos u JSON na serveru..
                .then(response => {
                    this.trans = response.data.transformers; // nakon callbacka šalje updated listu za prikaz (samo za provjeru)
                })
                .catch(error => {
                    console.log(error);
                });
                this.trName = '';  // isprazni rubrike za novi unos..
                this.veGroup = '';
                vehType = '';
                vehModel = '';
                this.$router.push({ name: 'home', path: '/'}); // i redirectaj na naslovnicu
                
            },
            resetOthers() {  // kada odabere grupu, tip ili model vozila resetiraj sve ostale reactive inpute
                if (this.veGroup === 'Air') {
                    this.veTypeAir = '';
                    this.veTypeSea = '';
                    this.veModelSea = '';
                    this.veTypeLand = '';
                    this.veModelLand = ''; 
                }
                if (this.veGroup === 'Sea') {
                    this.veTypeAir = '';
                    this.veTypeSea = '';
                    this.veModelSea = '';
                    this.veTypeLand = '';
                    this.veModelLand = ''; 
                }
                if (this.veGroup === 'Land') {
                    this.veTypeAir = '';
                    this.veTypeSea = '';
                    this.veModelSea = '';
                    this.veTypeLand = '';
                    this.veModelLand = ''; 
                }
            },
            resetTypes() {  // resetiraj sve modele osim odabranog (za reactive promjenu modela)
                    if (this.veGroup === 'Sea' || this.veGroup === 'Land' || this.veGroup === 'Air') {
                        this.veModelSea = '';
                        this.veModelLand = '';
                    }
            }
        }
    }
</script>
