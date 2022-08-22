let appConfig={};

appConfig.port=4000;
appConfig.allowedCorsOrigin="*";
appConfig.env="dev";
appConfig.db={
    uri:'mongodb://127.0.0.1:27017/todoApp'
};


appConfig.apiVersion='/api/V1';

module.exports={
    port:appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    environment:appConfig.env,
    db:appConfig.db,
    apiVersion:appConfig.apiVersion
}