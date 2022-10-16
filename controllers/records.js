import dns  from 'dns';

export const getAllRecords = async (req, res) => {
  const { domain } = req.params;
  var resData = [];
        var querys = [{queryDomain : domain, queryType : "A", sendType :"A"} ,{queryDomain : "ftp."+domain, queryType : "A", sendType :"FTP"}, {queryDomain : "www."+domain, queryType : "A", sendType :"WWW"},{queryDomain : domain, queryType : "NS", sendType :"NS"}, {queryDomain : domain, queryType : "TXT", sendType :"TXT"}];
           
        querys.forEach(element => {
            dns.promises.resolve(element.queryDomain, element.queryType)
            .then((resolve) => {
              resData.push({ type: element.sendType, value: resolve})
            })
            .catch((err) => {
              console.log(err);
            })  
        });
     
        try {
            var recordsMX = await dns.promises.resolve(domain, 'MX');
            var editrecordsMX=[];
            for(let item of recordsMX) {
              var recordsMXip = await dns.promises.resolve(item.exchange, 'A');
              editrecordsMX.push([ item.priority+"  "+ item.exchange+"  "+ recordsMXip ]);
            }
            resData.push({ type: "MX", value: editrecordsMX });
        } catch (error) {
          console.log(error);
        }

        setTimeout(() => {
          res.send(resData);
          resData=[];
        }, 500);
};