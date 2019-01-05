var dados = [{
    nome:'Gato1',
    apelido:'F1',
    src:'./img/cat_picture1.jpg',
    clicks: 0
},{
    nome:'Gato2',
    apelido:'F2',
    src:'./img/cat_picture2.jpeg',
    clicks: 0
},{
    nome:'Gato3',
    apelido:'F3',
    src:'./img/cat_picture3.jpeg',
    clicks: 0
},{
    nome:'Gato4',
    apelido:'F4',
    src:'./img/cat_picture4.jpeg',
    clicks: 0
},{
    nome:'Gato5',
    apelido:'F5',
    src:'./img/cat_picture5.jpeg',
    clicks: 0
}];


var Gato = function(gato){
    this.nome    = ko.observable((gato) ? gato.nome : undefined);
    this.apelido = ko.observable((gato) ? gato.apelido : undefined);
    this.src     = ko.observable((gato) ? gato.src : undefined);
    this.clicks  = ko.observable((gato) ? gato.clicks : undefined);
    this.titulo  = ko.computed(function(){
        var clicks = this.clicks();
        if(clicks<10)return 'Newborn';
        if(clicks<50)return 'Infant';
        if(clicks<100)return 'Child';
        if(clicks<200)return 'Teen';
        if(clicks<500)return 'Adult';
        else return 'Ninja';
    },this);
}



var ViewModel = function(){
    var self = this;
    
    
    


    /*function convertToObservable(list) { 
        var newList = []; 
        list.forEach(function (obj,i) {
            var newObj = {}; 
            Object.keys(obj).forEach(function (key) { 
                newObj[key] = ko.observable(obj[key]); 
            }); 
            newObj.titulo = ko.computed();
            newList.push(newObj); 
        }); 
        return newList; 
    };*/



    self.model = ko.observableArray([]);
    dados.forEach(function(gato){
        self.model.push(new Gato(gato));
    });

    /*self.selecionado = ko.observable(0);

    self.gatoSelecionado = ko.computed(function(){
        return self.model()[self.selecionado()];
    },self);*/

    self.gatoSelecionado = ko.observable(self.model()[0]);

    self.gatoClick = function(){
        self.gatoSelecionado().clicks(self.gatoSelecionado().clicks()+1);
    };

    self.carregaGato = function(gato){
        //self.selecionado(self.model.indexOf(gato));
        self.gatoSelecionado(gato);
    };

};

ko.applyBindings(new ViewModel());