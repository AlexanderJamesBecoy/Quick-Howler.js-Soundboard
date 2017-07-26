!function($w) {
    var config;
    var renderer;
    var rootStage;
    
    var txZombie;
    var txZombieSize = 32;
    var zombies = [];
    var NUM_ZOMBIES = 100;
    var ZOMBIE_MAX_SPEED = 5;
    
    function setup(_config) {
        config = _config;
        renderer = new PIXI.autoDetectRenderer(config.resolution.width, config.resolution.height);
        renderer.backgroundColor = config.backgroundColor;
        
        $w.document.body.appendChild( renderer.view );
        
        rootStage = new PIXI.Container();
        
        txZombie = new PIXI.Texture.fromImage('/assets/zombie.png');
        txZombie.frame = new PIXI.Rectangle(0, 0, txZombieSize, txZombieSize);
        
        // @TODO -- Load zombie asset
        
        build();
        return render;
    }
    
    function build() {
        // @TODO -- Draw Street
        var street = new PIXI.Graphics();
        street.beginFill(0x0);
        street.drawRect(0, 200, config.resolution.width, 48);
        street.endFill();
        
        rootStage.addChild(street);
        
        for (var lx = 10; lx < config.resolution.width; lx += 100) {
            var streetline = new PIXI.Graphics();
            streetline.beginFill(0xc3cb00);
            streetline.drawRect(lx, 220, 50, 10);
            streetline.endFill();
            
            rootStage.addChild(streetline);
        }
        
        // @TODO -- Add zombies
        for (var z = 0; z < NUM_ZOMBIES; z++) {
            var zombie = new PIXI.Sprite(txZombie);
            zombie.anchor.set(0.5, 0.5);
            zombie.position.set(config.resolution.width * Math.random(), config.resolution.height * Math.random());
            rootStage.addChild(zombie);
        }
    }
    
    function update() {
        // @TODO -- Move zombies and remove ones that run off-screen
        //       -- if there are no more left, terminate the render loop
        
        return NUM_ZOMBIES > 0;
    }
    
    function render() {
        if (! update()) {
            console.warn("Render loop ended");
            return;
        }
        
        renderer.render(rootStage);
        requestAnimationFrame(render);
    }
    
    $w.setup = setup;
}(this);