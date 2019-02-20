<template> <!-- edit Transformera -->
<div>
    <div class="row">
        <router-link v-bind:to="{name: 'home'}" style="color: white; padding-left: 2rem; padding-top: 0.3rem;">Back</router-link>
    </div>
    <div class="container">
        <div class="row">
            <h2  style="padding-top: 1rem; padding-left: 2rem; padding-bottom: 0.5rem;">Edit {{imeNew}}</h2>
        </div>


        <div class="row" >
            <div class="col col-sm-3">
                <div class="card" style="width: 28rem;">
                    <div class="card-body">
                                               
                        <form>
                            <div class="form-group">
                                <label for="transName">Name </label>
                                <input type="text" class="form-control" v-model="imeNew" id="transName" aria-describedby="transName">
                            </div>
                            
                            <!-- kada odabere grupu resetira sve ostale rubrike -->
                            <div class="form-group">
                            <label for="vehGroup">Vehicle Group </label>  
                                <!-- <select v-model="veGroup" @change="resetOthers" class="custom-select" id="vehGroup"> -->
                                <select v-model="grupaNew" @change="resetOthers" class="custom-select" id="vehGroup">
                                    <option disabled value="">Odaberi grupu vozila</option>
                                    <option>Air</option>
                                    <option>Sea</option>
                                    <option>Land</option>
                                </select>
                            </div>
                            
                            <!-- Grupa vozila Air -->
                            <div class="form-group" v-if="grupaNew === 'Air'"> 
                            <label for="vehTypeAir">Vehicle Type </label>
                                <select v-model="tipNew" class="custom-select" id="vehTypeAir" >
                                    <option disabled value="">Odaberi tip zračnih vozila</option>
                                    <option>Plane</option>
                                    <option>Helicopter</option>
                                </select>
                            </div>
                            
                            <!-- Grupa vozila Sea -->
                            <div class="form-group" v-if="grupaNew === 'Sea'"> 
                            <label for="vehTypeSea">Vehicle Type </label> 
                                <select v-model="tipNew" @change="resetTypes" class="custom-select" id="vehTypeSea" >
                                    <option disabled value="">Odaberi tip vodenih vozila</option>
                                    <option>Boat</option>
                                    <option>Submarine</option>
                                </select>
                            </div>
                
                            <!-- Model vozila Sea > Boat -->
                            <div class="form-group" v-if="tipNew === 'Boat'"> 
                            <label for="vehModelSea">Vehicle Model </label>
                                <select v-model="modelNew" class="custom-select" id="vehModelSea" >
                                    <option disabled value="">Odaberi model vodenog vozila</option>
                                    <option>Sailboat</option>
                                    <option>Jetboat</option>
                                </select>
                            </div>
                            
                            <!-- Model vozila Sea > Sub -->
                            <div class="form-group" v-if="tipNew === 'Submarine'"> 
                            <label for="vehModelSeaSub">Vehicle Model </label>
                                <select v-model="modelNew" class="custom-select" id="vehModelSeaSub" >
                                    <option disabled value="">Odaberi model vodenog vozila</option>
                                    <option>Standard</option>
                                </select>
                            </div>
                            
                            <!-- Grupa vozila Land -->
                            <div class="form-group" v-if="grupaNew === 'Land'"> 
                            <label for="vehTypeLand">Vehicle Type </label>
                                <select v-model="tipNew" @change="resetTypes" class="custom-select" id="vehTypeLand" >
                                    <option disabled value="">Odaberi model cestovnog vozila</option>
                                    <option>Car</option>
                                    <option>Truck</option>
                                </select>
                            </div>
                
                            <!-- Model vozila Land > Car -->
                            <div class="form-group" v-if="tipNew === 'Car'"> 
                            <label for="vehModelLand">Vehicle Type </label>
                                <select v-model="modelNew" class="custom-select" id="vehModelLand" >
                                    <option disabled value="">Odaberi model cestovnog vozila</option>
                                    <option>Camaro</option>
                                    <option>AMG GT R</option>
                                    <option>Lamborghini</option>
                                </select>
                            </div>
                            
                            <!-- Model vozila Land > Truck -->
                            <div class="form-group" v-if="tipNew === 'Truck'"> 
                            <label for="vehModelLandTruck">Vehicle Type </label>
                                <select v-model="modelNew" class="custom-select" id="vehModelLandTruck" >
                                    <option disabled value="">Odaberi model cestovnog vozila</option>
                                    <option>Unimog</option>
                                    <option>Western Star 5700</option>
                                </select>
                            </div>
                            
                            <!-- Gear lista -->
                            <div class="form-group"> 
                                <label for="vehGear">Odaberi ili dodaj opremu (odvajaj zarezom)</label>
                                    <input type="text" class="form-control" id="vehGear" aria-describedby="vehGear" v-model="opremaNew"> 
                                    <!-- v-model u input preuzima iteme iz [] oprema + moguće ih je mijenjati, sa v-bind:value=".." nije moguće -->
                            </div> 


                            <!-- Factions radiobutton -->
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="gangNew" name="exampleRadios" id="exampleRadios1" value="Autobots">
                                <label class="form-check-label" for="exampleRadios1">
                                    Autobots
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="gangNew" name="exampleRadios" id="exampleRadios2" value="Decepticons">
                                <label class="form-check-label" for="exampleRadios2">
                                    Decepticons
                                </label>
                            </div>
                            

                            <div class="form-group" style="margin-top: 1rem;">
                                <button type="submit" class="btn btn-primary" v-on:click.prevent="editItem">Spremi</button>
                            </div>
                            
                        </form>
                        
                       
                    </div>
                </div>
                <br>

            </div> <!-- end of col -->
        </div>    



    </div>
</div>  <!-- end of wrapper div, bez toge Vue ne radi -->    
</template>


<script>
import axios from 'axios';

export default {
    name: 'edit',
    props: ['ajdi', 'ime', 'grupa', 'tip', 'model', 'oprema', 'gang'],  // preneseni podaci kliknutog Transformera, mora pojedinačno itemi, sa v-model se mijenjaju jednako kao i data propertyji
    data() {
        return {
            imeNew: this.ime,  // treba jer nije dobro direktno mijenjati vrijednost props sa v-model
            grupaNew: this.grupa,
            tipNew: this.tip,
            modelNew: this.model,
            opremaNew: this.oprema,
            gangNew: this.gang
        }
    },
    methods: {
        resetTypes() {  // resetiraj sve modele osim odabranog (za reactive promjenu modela)
            if (this.grupaNew === 'Sea' || this.grupaNew === 'Land' || this.grupaNew === 'Air') {
                this.modelNew = '';
            }
        },
        resetOthers() {  // kada odabere grupu, tip ili model vozila resetiraj sve ostale reactive inpute
            if (this.grupaNew === 'Air' || this.grupaNew === 'Sea' || this.grupaNew === 'Land') {
                this.tipNew = '';
                this.modelNew = '';
            }
        },
        editItem() {  // updataj editirani unos
            let opremaTemp = this.opremaNew;

            if (typeof opremaTemp === 'string') { // ako je user editirao listu oružja..
                opremaTemp = this.opremaNew.split(',').map(s => s.trim()); // pretvori string natrag u array, ako je stavio razmak izbaci iz arraya
            }

            let edited = {
                id: this.ajdi,
                name: this.imeNew,
                vehicleGroup: this.grupaNew,
                vehicleType: this.tipNew,
                vehicleModel: this.modelNew,
                gear: opremaTemp,
                factions: this.gangNew,
                status: 'OK'  // nakon editiranja status se vraća na default OK
            }

            axios.post('/edit', edited)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log('Edit nije snimljen ' + error);
                })
            this.$router.push({ name: 'home', path: '/'});  // nakon callbacka redirectaj na naslovnicu    
        }
    }
    
    
}
</script>
