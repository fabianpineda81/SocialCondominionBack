const { response } = require("express")

const esAdminRole=(req, res=response, next)=>{
    
    if(!req.usuario){
        return res.status(500).json({
            msg:"se quiere validar el rol sin validar el token primero"
        })
    }
    console.log("rol-",req.usuario)
    const {rol,nombre}=req.usuario;
    console.log("rol-",rol)

    if(rol!='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es un usuario admin`
        })
    }
    next();
}

const tieneRole=(...roles)=>{
    return  (req,res=response, next)=>{
        
    if(!req.usuario){
        return res.status(500).json({
            msg:"se quiere validar el rol sin validar el token primero"
        })
    }

        if(!roles.includes(req.usuario.rol)){
           return res.status(401).json({
                msg:`el servicio requiere uno de estos roles ${roles}`
            })
        }
    
        next();
    }
}

module.exports={
    esAdminRole,
    tieneRole
}
