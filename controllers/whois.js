import dns  from 'dns';
import whois from 'whois-json';

export const getWhois = async (req, res) => {
    const { domain } = req.params;
    var resData = [];
    var checkA;
    var domainWhois;
    try {
            checkA = await dns.promises.resolve(domain, "A");
    } catch (error) {
            checkA=null;
    }
    try {
        domainWhois = await whois(domain);
    } catch (error) {
        domainWhois.registrar=null;
    }

    if(domainWhois.registrar == null && checkA == null)
    {
        resData.push({ type: "empty"});
    }

    else{
        resData.push({ type: "Whois", value: [domainWhois.registrar,domainWhois.nameServer,domainWhois.creationDate,domainWhois.updatedDate,domainWhois.registrarRegistrationExpirationDate]});
    }

    res.send(resData);
    resData=[];
    checkA="";
    domainWhois="";

}