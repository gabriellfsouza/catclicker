$(function(){
    var model = {
        dados:[{
            nome:'Gato1',
            src:'./img/cat_picture1.jpg',
            clicks: 0
        },{
            nome:'Gato2',
            src:'./img/cat_picture2.jpeg',
            clicks: 0
        },{
            nome:'Gato3',
            src:'./img/cat_picture3.jpeg',
            clicks: 0
        },{
            nome:'Gato4',
            src:'./img/cat_picture4.jpeg',
            clicks: 0
        },{
            nome:'Gato5',
            src:'./img/cat_picture5.jpeg',
            clicks: 0
        }],

        selectionado : -1,

        findGato:function(nome){
            return this.dados.find(function(elemento){
                return elemento.nome == nome;
            });
        },

        getGatoAtual:function(){
            return (this.selectionado+1)?this.dados[this.selectionado] : undefined;
        },

        setGatoAtual:function(nome){
            this.selectionado = this.dados.indexOf(this.findGato(nome));
        },
        
        getGatos:function(){
            return this.dados;
        }
    };

    var octopus = {
        

        addClick:function(nome){
            var gato = model.getGatoAtual();
            if(gato) gato.clicks ++;
            view.render();
        },
        
        getGatoSelecionado:function(){
            var gato = model.getGatoAtual();
            return (gato) ? gato : {nome:'',src:'',clicks:''};
        },

        setGatoAtual:function(nome){
            model.setGatoAtual(nome);
            view.render();
        },

        getGatos:function(){
            return model.getGatos();
        },

        init:function(){
            model.selectionado = 0;
            view.init();
        }

    };


    var view = {
        init: function() {
            
            this.catDisplay = $('.catDisplay');
            this.catArray = $('.catArray');

            this.areaEdicao = $('.areaEdicao');
            this.tituloEdicao = $('.titulo',this.areaEdicao);
            this.imagemEdicao = $('.imagem',this.areaEdicao);
            this.cliquesEdicao = $('.cliques',this.areaEdicao);
            this.btnSalvarEdicao = $('.btnSalvar',this.areaEdicao);
            this.btnCancelarEdicao = $('.btnCancelar',this.areaEdicao);

            this.btnAdmin = $('.btnAdmin');

            that = this;

            this.btnAdmin.click(function(e){
                that.gatoSelecionado = octopus.getGatoSelecionado();
                that.tituloEdicao.val(that.gatoSelecionado.nome);
                that.imagemEdicao.val(that.gatoSelecionado.src);
                that.cliquesEdicao.val(that.gatoSelecionado.clicks);
                that.areaEdicao.css('display','block');
                //this.btnAdmin.css('display','none');
                that.btnAdmin.attr('disabled','');
            });

            this.btnSalvarEdicao.click(function(e){
                that.gatoSelecionado.nome = that.tituloEdicao.val();
                that.gatoSelecionado.src = that.imagemEdicao.val();
                that.gatoSelecionado.clicks = that.cliquesEdicao.val();

                that.areaEdicao.css('display','none');
                that.btnAdmin.removeAttr('disabled');
                that.render();
            });

            this.btnCancelarEdicao.click(function(e){
                that.areaEdicao.css('display','none');
                that.btnAdmin.removeAttr('disabled');
                view.render();
            });
            
            this.render();
        },

        render: function(){
            var that = this;
            this.catDisplay.empty();
            this.catArray.empty();
            
            var gato = octopus.getGatoSelecionado();
            
            var titulo = "<h2 class='titulo'>"+gato.nome+"</h2>";
            var imagem = "<img class='imagem' src='"+gato.src+"' alt='Imagem do gato' value='"+gato.nome+"' />";
            var clicks = "<p class='cliques'>Cliques: "+gato.clicks+"</p>";

            this.catDisplay.append(titulo);
            this.catDisplay.append(imagem);
            this.catDisplay.append(clicks);

            octopus.getGatos().forEach(function(gato){
                var button = "<button value='"+gato.nome+"'>"+gato.nome+"</button>";
                that.catArray.append(button);
            });

            var catImg = $(".imagem",this.catDisplay);
            var btnCats = $("button",this.catArray);

            catImg.click(function(e){
                octopus.addClick(e.target.value);
                e.preventDefault();
            });

            btnCats.click(function(e){
                octopus.setGatoAtual(e.target.value);
                e.preventDefault();
            });
            
        }
    };

    octopus.init();
});