export const EnemyConfig = {

    rat: {
        idle: 'rat_idle',
        angry: 'rat_angry',
        speed: 40,
        bubbleOffsetY: -11,
        scale: 1.8,
        invertFlip: false,
        isFlying: false,   
        jumpForce: -250,
        body: {
            width: 16,
            height: 16,
            offsetX: 24,
            offsetY: 32
        },
    },

    fly:{
        idle:'fly_idle',
        angry:'fly_idle',
        speed:60,
        bubbleOffsetY: 0,
        scale:1.2,
        invertFlip: false,
        isFlying: true,
        body:{
            width:20,
            height:20,
            offsetX:6,
            offsetY:8
        }
    },

    bee: {
        idle: 'bee_idle',
        angry: 'bee_angry', 
        speed: 50,  
        scale: 1.5, 
        invertFlip: true,
        isFlying: true,
        body: {
            width: 24,      
            height: 20,    
            offsetX: 20,     
            offsetY: 22     
        },
        bubbleOffsetY: 5    
    },

    dragonfly: {
        idle: 'dragonfly_idle',
        angry: 'dragonfly_angry',
        speed: 65,  
        scale: 1.2, 
        body: {
            width: 22,       
            height: 18,      
            offsetX: 5,      
            offsetY: 8       
        },
        bubbleOffsetY: -2,   
        invertFlip: false,
        isFlying: true    
    },

    ghost: {
        idle: 'ghost_idle',
        angry: 'ghost_idle', 
        speed: 95,          
        scale: 1, 
        isFlying: true,     
        body: { 
            width: 32,    
            height: 32, 
            offsetX: 18,  
            offsetY: 14  
        }
    }
};