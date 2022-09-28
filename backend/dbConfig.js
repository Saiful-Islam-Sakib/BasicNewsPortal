const config = {
    user :'skb',
    password :'123456789',
    server:'SIS-DESKTOP',
    database:'NewsPortal',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'MSSQLSERVER'
    },
    port : 1433,
    trustServerCertificate: true
}

module.exports = config;