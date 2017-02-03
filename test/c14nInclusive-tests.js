const c14n = require("../lib/exclusive-canonicalization").ExclusiveCanonicalization,
  Dom = require('xmldom').DOMParser,
  select = require('xpath.js'),
  SignedXml = require('../lib/signed-xml.js').SignedXml
const compare = function (test, xml, xpath, expected, inclusiveNamespacesPrefixList) {
  test.expect(1)
  const doc = new Dom().parseFromString(xml),
    elem = select(doc, xpath)[0],
    can = new c14n(),
    result = can.process(elem, { isC14n: true, inclusiveNamespacesPrefixList: inclusiveNamespacesPrefixList }).toString()

  test.equal(expected, result)
  test.done()
}
module.exports = {
  "Inclusive canonicalization works": (test) => {
    compare(test,
      '<CFE xmlns="http://cfe.dgi.gub.uy" version="1.0"><eRem><TmstFirma>2016-10-31T17:41:53-03:00</TmstFirma><Encabezado><IdDoc><TipoCFE>181</TipoCFE><Serie>A</Serie><Nro>39474</Nro><FchEmis>2016-10-31</FchEmis><TipoTraslado>2</TipoTraslado></IdDoc><Emisor><RUCEmisor>213188480018</RUCEmisor><RznSoc>CORPORACION DE MAQUINARIA S.A.</RznSoc><NomComercial>COMASA DURAZNO</NomComercial><GiroEmis>Importaciones</GiroEmis><Telefono>Tel: 4362 7000</Telefono><Telefono>4362 7000</Telefono><CorreoEmisor>info@comasa.com.uy</CorreoEmisor><EmiSucursal>Sucursal Durazno</EmiSucursal><CdgDGISucur>7</CdgDGISucur><DomFiscal>Ruta N°5, Km. 181.500</DomFiscal><Ciudad>Durazno</Ciudad><Departamento>Durazno</Departamento></Emisor><Receptor><TipoDocRecep>2</TipoDocRecep><CodPaisRecep>UY</CodPaisRecep><DocRecep>180067050012</DocRecep><RznSocRecep>KENT BURGOS GUSTAVO</RznSocRecep><DirRecep>PALMITAS</DirRecep><CiudadRecep>PALMITAS</CiudadRecep><DeptoRecep>SORIANO</DeptoRecep><PaisRecep/><CP>    0</CP><InfoAdicional>119988-M5-RT</InfoAdicional><LugarDestEnt/><CompraID/></Receptor><Totales><CantLinDet>1</CantLinDet></Totales></Encabezado><Detalle><Item><NroLinDet>1</NroLinDet><CodItem><TpoCod>EAN</TpoCod><Cod>87585425    181</Cod></CodItem><NomItem>JGO SELLOS MOTOR HID LONAS 2152</NomItem><DscItem> E06A050202-2</DscItem><Cantidad>2.000</Cantidad><UniMed>UNI</UniMed></Item></Detalle><CAEData><CAE_ID>90150048908</CAE_ID><DNro>1</DNro><HNro>65000</HNro><FecVenc>2017-06-28</FecVenc></CAEData></eRem></CFE>',
      "//*",
      '<CFE xmlns="http://cfe.dgi.gub.uy" version="1.0"><eRem><TmstFirma>2016-10-31T17:41:53-03:00</TmstFirma><Encabezado><IdDoc><TipoCFE>181</TipoCFE><Serie>A</Serie><Nro>39474</Nro><FchEmis>2016-10-31</FchEmis><TipoTraslado>2</TipoTraslado></IdDoc><Emisor><RUCEmisor>213188480018</RUCEmisor><RznSoc>CORPORACION DE MAQUINARIA S.A.</RznSoc><NomComercial>COMASA DURAZNO</NomComercial><GiroEmis>Importaciones</GiroEmis><Telefono>Tel: 4362 7000</Telefono><Telefono>4362 7000</Telefono><CorreoEmisor>info@comasa.com.uy</CorreoEmisor><EmiSucursal>Sucursal Durazno</EmiSucursal><CdgDGISucur>7</CdgDGISucur><DomFiscal>Ruta N°5, Km. 181.500</DomFiscal><Ciudad>Durazno</Ciudad><Departamento>Durazno</Departamento></Emisor><Receptor><TipoDocRecep>2</TipoDocRecep><CodPaisRecep>UY</CodPaisRecep><DocRecep>180067050012</DocRecep><RznSocRecep>KENT BURGOS GUSTAVO</RznSocRecep><DirRecep>PALMITAS</DirRecep><CiudadRecep>PALMITAS</CiudadRecep><DeptoRecep>SORIANO</DeptoRecep><PaisRecep></PaisRecep><CP>    0</CP><InfoAdicional>119988-M5-RT</InfoAdicional><LugarDestEnt></LugarDestEnt><CompraID></CompraID></Receptor><Totales><CantLinDet>1</CantLinDet></Totales></Encabezado><Detalle><Item><NroLinDet>1</NroLinDet><CodItem><TpoCod>EAN</TpoCod><Cod>87585425    181</Cod></CodItem><NomItem>JGO SELLOS MOTOR HID LONAS 2152</NomItem><DscItem> E06A050202-2</DscItem><Cantidad>2.000</Cantidad><UniMed>UNI</UniMed></Item></Detalle><CAEData><CAE_ID>90150048908</CAE_ID><DNro>1</DNro><HNro>65000</HNro><FecVenc>2017-06-28</FecVenc></CAEData></eRem></CFE>')
  },
  "Inclusive canonicalization works with dif namespaces": (test) => {
    compare(test, `<CFE version="1.0" xmlns="http://cfe.dgi.gub.uy" xmlns:xd="http://www.w3.org/2000/09/xmldsig#">
  <eFact>
    <TmstFirma>2016-10-18T16:00:45-03:00</TmstFirma>
    <Encabezado>
      <IdDoc>
        <TipoCFE>111</TipoCFE>
        <Serie>B</Serie>
        <Nro>7685071</Nro>
        <FchEmis>2016-10-18</FchEmis>
        <PeriodoDesde>2016-10-01</PeriodoDesde>
        <PeriodoHasta>2016-10-31</PeriodoHasta>
        <FmaPago>2</FmaPago>
        <FchVenc>2016-10-18</FchVenc>
      </IdDoc>
      <Emisor>
        <RUCEmisor>211003420017</RUCEmisor>
        <RznSoc>Administración Nacional de Telecomunicaciones</RznSoc>
        <NomComercial>ANTEL</NomComercial>
        <GiroEmis>Telecomunicaciones</GiroEmis>
        <Telefono>29280000</Telefono>
        <CorreoEmisor>GS-CONCILIACIONES@MAIL.ANTEL.COM.UY</CorreoEmisor>
        <EmiSucursal/>
        <CdgDGISucur>1</CdgDGISucur>
        <DomFiscal>Guatemala 1075 (11800)</DomFiscal>
        <Ciudad>Montevideo</Ciudad>
        <Departamento>Montevideo</Departamento>
      </Emisor>
      <Receptor>
        <TipoDocRecep>2</TipoDocRecep>
        <CodPaisRecep>UY</CodPaisRecep>
        <DocRecep>180067050012</DocRecep>
        <RznSocRecep>KENT BURGOS GUSTAVO RANDERS</RznSocRecep>
        <DirRecep>BVAR CONT BOULEVARD RODO</DirRecep>
        <CiudadRecep>PALMITAS</CiudadRecep>
      </Receptor>
      <Totales>
        <TpoMoneda>UYU</TpoMoneda>
        <TpoCambio>1.00</TpoCambio>
        <MntNoGrv>0.00</MntNoGrv>
        <MntNetoIVATasaBasica>0.00</MntNetoIVATasaBasica>
        <IVATasaBasica>22.000</IVATasaBasica>
        <MntIVATasaBasica>0.00</MntIVATasaBasica>
        <MntTotal>0.00</MntTotal>
        <CantLinDet>1</CantLinDet>
        <MontoNF>0.00</MontoNF>
        <MntPagar>0.00</MntPagar>
      </Totales>
    </Encabezado>
    <Detalle>
      <Item>
        <NroLinDet>1</NroLinDet>
        <IndFact>3</IndFact>
        <NomItem>SERVICIOS DE TELECOMUNICACIONES GRAVADOS</NomItem>
        <DscItem>MOVIL</DscItem>
        <Cantidad>1</Cantidad>
        <UniMed>N/A</UniMed>
        <PrecioUnitario>53.28</PrecioUnitario>
        <DescuentoPct>0</DescuentoPct>
        <DescuentoMonto>53.28</DescuentoMonto>
        <MontoItem>0.00</MontoItem>
      </Item>
    </Detalle>
    <CAEData>
      <CAE_ID>90160002112</CAE_ID>
      <DNro>7636001</DNro>
      <HNro>7836000</HNro>
      <FecVenc>2018-01-10</FecVenc>
    </CAEData>
  </eFact>
  
</CFE>`,
      "//*",
      `<CFE xmlns="http://cfe.dgi.gub.uy" xmlns:xd="http://www.w3.org/2000/09/xmldsig#" version="1.0">
  <eFact>
    <TmstFirma>2016-10-18T16:00:45-03:00</TmstFirma>
    <Encabezado>
      <IdDoc>
        <TipoCFE>111</TipoCFE>
        <Serie>B</Serie>
        <Nro>7685071</Nro>
        <FchEmis>2016-10-18</FchEmis>
        <PeriodoDesde>2016-10-01</PeriodoDesde>
        <PeriodoHasta>2016-10-31</PeriodoHasta>
        <FmaPago>2</FmaPago>
        <FchVenc>2016-10-18</FchVenc>
      </IdDoc>
      <Emisor>
        <RUCEmisor>211003420017</RUCEmisor>
        <RznSoc>Administración Nacional de Telecomunicaciones</RznSoc>
        <NomComercial>ANTEL</NomComercial>
        <GiroEmis>Telecomunicaciones</GiroEmis>
        <Telefono>29280000</Telefono>
        <CorreoEmisor>GS-CONCILIACIONES@MAIL.ANTEL.COM.UY</CorreoEmisor>
        <EmiSucursal></EmiSucursal>
        <CdgDGISucur>1</CdgDGISucur>
        <DomFiscal>Guatemala 1075 (11800)</DomFiscal>
        <Ciudad>Montevideo</Ciudad>
        <Departamento>Montevideo</Departamento>
      </Emisor>
      <Receptor>
        <TipoDocRecep>2</TipoDocRecep>
        <CodPaisRecep>UY</CodPaisRecep>
        <DocRecep>180067050012</DocRecep>
        <RznSocRecep>KENT BURGOS GUSTAVO RANDERS</RznSocRecep>
        <DirRecep>BVAR CONT BOULEVARD RODO</DirRecep>
        <CiudadRecep>PALMITAS</CiudadRecep>
      </Receptor>
      <Totales>
        <TpoMoneda>UYU</TpoMoneda>
        <TpoCambio>1.00</TpoCambio>
        <MntNoGrv>0.00</MntNoGrv>
        <MntNetoIVATasaBasica>0.00</MntNetoIVATasaBasica>
        <IVATasaBasica>22.000</IVATasaBasica>
        <MntIVATasaBasica>0.00</MntIVATasaBasica>
        <MntTotal>0.00</MntTotal>
        <CantLinDet>1</CantLinDet>
        <MontoNF>0.00</MontoNF>
        <MntPagar>0.00</MntPagar>
      </Totales>
    </Encabezado>
    <Detalle>
      <Item>
        <NroLinDet>1</NroLinDet>
        <IndFact>3</IndFact>
        <NomItem>SERVICIOS DE TELECOMUNICACIONES GRAVADOS</NomItem>
        <DscItem>MOVIL</DscItem>
        <Cantidad>1</Cantidad>
        <UniMed>N/A</UniMed>
        <PrecioUnitario>53.28</PrecioUnitario>
        <DescuentoPct>0</DescuentoPct>
        <DescuentoMonto>53.28</DescuentoMonto>
        <MontoItem>0.00</MontoItem>
      </Item>
    </Detalle>
    <CAEData>
      <CAE_ID>90160002112</CAE_ID>
      <DNro>7636001</DNro>
      <HNro>7836000</HNro>
      <FecVenc>2018-01-10</FecVenc>
    </CAEData>
  </eFact>
  
</CFE>`,['xd'])
  },
  "Validates signtarure from sobre Sob_213188480018_20161031_12146": (test) => {
    let sig = new SignedXml('wssecurity', { inclusiveNamespacesPrefixList: ['xd'] })
    sig.keyInfoProvider = {
      getKey: () => {
        return `-----BEGIN CERTIFICATE-----\nMIIGTDCCBDSgAwIBAgITYNe61BA41UWOz26Vcda9NUBPCDANBgkqhkiG9w0BAQsF\nADBaMR0wGwYDVQQDExRDb3JyZW8gVXJ1Z3VheW8gLSBDQTEsMCoGA1UECgwjQWRt\naW5pc3RyYWNpw7NuIE5hY2lvbmFsIGRlIENvcnJlb3MxCzAJBgNVBAYTAlVZMB4X\nDTE1MDUyOTIwMDgwMVoXDTE3MDUyODIwMDgwMVoweTEYMBYGA1UEBRMPUlVDMjEz\nMTg4NDgwMDE4MQswCQYDVQQGEwJVWTEnMCUGA1UEChMeQ09SUE9SQUNJT04gREUg\nTUFRVUlOQVJJQSBTLkEuMScwJQYDVQQDEx5DT1JQT1JBQ0lPTiBERSBNQVFVSU5B\nUklBIFMuQS4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCEU53qyAod\n/XRuTUMhia5AJXBgxlN/syFHQHx7zAQxKqKL+PBhNPOe7iJYElPhckjwQoG7qdcm\noItCAkWKlFHvqdlf5kjPCNigRedA5mehdGwQPdDWDnHQeQwpm/NySdGbzG2TJWYM\nC+mDNJ13Jq75T5n0laORuuO0VDaTjiPTPdUkpEhtjsohFkP9M44GWcwIZwI3ROr0\ntziwlNH8cFuGpgJRrpOXFsgfbec3rlbBfFMdQE0Rs8spx9khA/lOgGfnBd2uJLbr\n6okVdfcwpYC9tISF3lbGyJ/9NTlFwfyUkSIOCLD2y0pzeS4ouhj0Ud7yGF87HuoB\njywGrIwZaWTlAgMBAAGjggHqMIIB5jB5BggrBgEFBQcBAQRtMGswNgYIKwYBBQUH\nMAKGKmh0dHA6Ly9hbmNjYS5jb3JyZW8uY29tLnV5L2FuY2NhL2FuY2NhLmNlcjAx\nBggrBgEFBQcwAYYlaHR0cDovL2FuY2NhLmNvcnJlby5jb20udXkvYW5jY2EvT0NT\nUDAOBgNVHQ8BAf8EBAMCBPAwDAYDVR0TAQH/BAIwADA7BgNVHR8ENDAyMDCgLqAs\nhipodHRwOi8vYW5jY2EuY29ycmVvLmNvbS51eS9hbmNjYS9hbmNjYS5jcmwwgbgG\nA1UdIASBsDCBrTBkBgtghlqE4q4dhIgFBDBVMFMGCCsGAQUFBwIBFkdodHRwOi8v\ndWNlLmd1Yi51eS9pbmZvcm1hY2lvbi10ZWNuaWNhL3BvbGl0aWNhcy9jcF9wZXJz\nb25hX2p1cmlkaWNhLnBkZjBFBgtghlqE4q4dhIgFBjA2MDQGCCsGAQUFBwIBFiho\ndHRwOi8vYW5jY2EuY29ycmVvLmNvbS51eS9hbmNjYS9jcHMucGRmMBMGA1UdJQQM\nMAoGCCsGAQUFBwMCMB0GA1UdDgQWBBRVrbCO6GD61jP0sp+GmU9Au1rDWjAfBgNV\nHSMEGDAWgBRs4rAmjVvWJggfmF1p4A5/VeyudjANBgkqhkiG9w0BAQsFAAOCAgEA\nXCJngvpvDkNMXnUIfM1PiSF5OdjX0NFtI2W0C32newAEj3Sa36D/2Wr710/s8dkV\n6V9vqeFPR4YY2AO7jwM/M7KqjbUel6MHf0ZKjtksgWTvhJtNSphcya84wxRXAhzC\nftlRM/Ckc4Patc2fQH1W/P4LYrEPwHUclEqqJDY50wT2tHHzg069yGl1NhJVoL73\n9E1rLGrl1nC+v62NLnQNm3OvcZy3dVPEYqO1vI9rOltzv6dkMmwKtOmX6sUMY/Z/\nZ9lQfVVNABwQEGmrm4E7QlmFb1wWL+BRo5AQQ0gbD/C7PcaLfqfhslmvXwHgq7LK\n2428hgFRWLc4IrRVOFo5qRLTOJp4xJB2Vby51q0/uEYPQD0p7hbh0J9Wf9xJXie+\nr85xwEwZn19ry+UkycWYB7X4WNwGM/gGmv8+uIQqduPZboIkx8h+8Qqop6EbYoQH\nO6jZK6aHTUEvTnadGNVi55rlSx8J6liwEIPiayGYy+fK7NYCCfu58WXOR6GLWsYX\n2bh92m34vhz+G05n1+0mv3M2PEOnWLwy1wk5Yql1imtzLrnJnAiuNipsUzAbGqKV\nhvQEj5suMPH7C78UvbEzhnuXvifbJfeBiO0EFsWs9p+o1WfSzesIlX0iC2+dsl7l\nfWHSODq/nkmYp1KCwUo+okk9n82SntfuPlLy3n63+MA=\n-----END CERTIFICATE-----`
      }

    }
    sig.loadSignature('<Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/><DigestValue>1PhwjsxBz+Ai8UhqZOszYOKYeh0=</DigestValue></Reference></SignedInfo><SignatureValue>EatPuoUnLr/jKbAaBRzdw+b9mDElQTY1Ld6D6LAQ6LCO3jN/W2MMTSFsfFLmXfRNn4aNoAhwwp7PwaaNwiyrIwY1KU5pO1FlF1cQZO7yxx3dbc/kCbnZagYd9kreJPElWFjezpd2tOOGsrUE5+c4Ql3LXe6noU21HZkU92jSJ+o+d5BmKIKV17q0B+bRqwbQGxSq8MK4LYY3XfPL8BdGYBwogJxK1aexBAT8wlUkDK1TGihAkHrKAUHXaIrUQhkV6ayqfCSy/PtspxzqjKq1VF1uNEmna6r5y29xYxwS0/mPR5y6idra5/mFr3knQ6BX4b30n4NM8oSP1iL2rcYkjg==</SignatureValue><KeyInfo><X509Data><X509IssuerSerial><X509IssuerName>C=UY,O=Administración Nacional de Correos,CN=Correo Uruguayo - CA</X509IssuerName><X509SerialNumber>2159664254935080137372912323586016229032218376</X509SerialNumber></X509IssuerSerial></X509Data></KeyInfo></Signature>')

    let sigIsValid = sig.checkSignature('<CFE xmlns="http://cfe.dgi.gub.uy" version="1.0"><eRem><TmstFirma>2016-10-31T17:41:53-03:00</TmstFirma><Encabezado><IdDoc><TipoCFE>181</TipoCFE><Serie>A</Serie><Nro>39474</Nro><FchEmis>2016-10-31</FchEmis><TipoTraslado>2</TipoTraslado></IdDoc><Emisor><RUCEmisor>213188480018</RUCEmisor><RznSoc>CORPORACION DE MAQUINARIA S.A.</RznSoc><NomComercial>COMASA DURAZNO</NomComercial><GiroEmis>Importaciones</GiroEmis><Telefono>Tel: 4362 7000</Telefono><Telefono>4362 7000</Telefono><CorreoEmisor>info@comasa.com.uy</CorreoEmisor><EmiSucursal>Sucursal Durazno</EmiSucursal><CdgDGISucur>7</CdgDGISucur><DomFiscal>Ruta N°5, Km. 181.500</DomFiscal><Ciudad>Durazno</Ciudad><Departamento>Durazno</Departamento></Emisor><Receptor><TipoDocRecep>2</TipoDocRecep><CodPaisRecep>UY</CodPaisRecep><DocRecep>180067050012</DocRecep><RznSocRecep>KENT BURGOS GUSTAVO</RznSocRecep><DirRecep>PALMITAS</DirRecep><CiudadRecep>PALMITAS</CiudadRecep><DeptoRecep>SORIANO</DeptoRecep><PaisRecep/><CP>    0</CP><InfoAdicional>119988-M5-RT</InfoAdicional><LugarDestEnt/><CompraID/></Receptor><Totales><CantLinDet>1</CantLinDet></Totales></Encabezado><Detalle><Item><NroLinDet>1</NroLinDet><CodItem><TpoCod>EAN</TpoCod><Cod>87585425    181</Cod></CodItem><NomItem>JGO SELLOS MOTOR HID LONAS 2152</NomItem><DscItem> E06A050202-2</DscItem><Cantidad>2.000</Cantidad><UniMed>UNI</UniMed></Item></Detalle><CAEData><CAE_ID>90150048908</CAE_ID><DNro>1</DNro><HNro>65000</HNro><FecVenc>2017-06-28</FecVenc></CAEData></eRem><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/><DigestValue>1PhwjsxBz+Ai8UhqZOszYOKYeh0=</DigestValue></Reference></SignedInfo><SignatureValue>EatPuoUnLr/jKbAaBRzdw+b9mDElQTY1Ld6D6LAQ6LCO3jN/W2MMTSFsfFLmXfRNn4aNoAhwwp7PwaaNwiyrIwY1KU5pO1FlF1cQZO7yxx3dbc/kCbnZagYd9kreJPElWFjezpd2tOOGsrUE5+c4Ql3LXe6noU21HZkU92jSJ+o+d5BmKIKV17q0B+bRqwbQGxSq8MK4LYY3XfPL8BdGYBwogJxK1aexBAT8wlUkDK1TGihAkHrKAUHXaIrUQhkV6ayqfCSy/PtspxzqjKq1VF1uNEmna6r5y29xYxwS0/mPR5y6idra5/mFr3knQ6BX4b30n4NM8oSP1iL2rcYkjg==</SignatureValue><KeyInfo><X509Data><X509IssuerSerial><X509IssuerName>C=UY,O=Administración Nacional de Correos,CN=Correo Uruguayo - CA</X509IssuerName><X509SerialNumber>2159664254935080137372912323586016229032218376</X509SerialNumber></X509IssuerSerial></X509Data></KeyInfo></Signature></CFE>')

    test.ok(sigIsValid)
    test.done()
  },
  "Validates signtarure from sobre Sob_211677800019_20161031_34571": (test) => {
    let sig = new SignedXml('wssecurity', { inclusiveNamespacesPrefixList: ['xd'] })
    sig.keyInfoProvider = {
      getKey: () => {
        return `-----BEGIN CERTIFICATE-----\nMIIGJzCCBA+gAwIBAgIUAJ72lYdJFZK3M6bPVK93mFdJoswwDQYJKoZIhvcNAQEL\nBQAwWjEdMBsGA1UEAxMUQ29ycmVvIFVydWd1YXlvIC0gQ0ExLDAqBgNVBAoMI0Fk\nbWluaXN0cmFjacOzbiBOYWNpb25hbCBkZSBDb3JyZW9zMQswCQYDVQQGEwJVWTAe\nFw0xNTExMDYyMTI0MzVaFw0xNzExMDUyMTI0MzVaMFMxGDAWBgNVBAUTD1JVQzIx\nMTY3NzgwMDAxOTELMAkGA1UEBhMCVVkxFjAUBgNVBAoTDUJMQU5RVUVPIFMuQS4x\nEjAQBgNVBAMTCVBFVFJPQlJBUzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\nggEBAOoNLktP6guGErgRHS0xXhuBAqPWarJ2jkYX++2fuIJygDTEdkWrzEAlFOWI\nqNp0fDgpmpoHjhObFpDTPha8IXRACJ697G2qStsQMCZhlKAfEi0GexzXua02VWZQ\n7V/UsRpzeIsO1LMFzg7icoH2nfahLGdGf5Qf6RUhBRVLi7rJZ7OW2kkgXDDo+1Cb\nWjmaDkro86AorSABZKLcyBSHOR5e9K0Zy4H7fVaU4tJb8PwLfCRiywS2wuMwgbH4\nXTcTDtPVdWf9fGGPPIHvzIdPcvPcmmV0H475XGPrlaXqR3ywzlnij09yDrfxiANZ\n61fbn0c8e8Utvm3DSHwlGTtR6e8CAwEAAaOCAeowggHmMHkGCCsGAQUFBwEBBG0w\nazA2BggrBgEFBQcwAoYqaHR0cDovL2FuY2NhLmNvcnJlby5jb20udXkvYW5jY2Ev\nYW5jY2EuY2VyMDEGCCsGAQUFBzABhiVodHRwOi8vYW5jY2EuY29ycmVvLmNvbS51\neS9hbmNjYS9PQ1NQMA4GA1UdDwEB/wQEAwIE8DAMBgNVHRMBAf8EAjAAMDsGA1Ud\nHwQ0MDIwMKAuoCyGKmh0dHA6Ly9hbmNjYS5jb3JyZW8uY29tLnV5L2FuY2NhL2Fu\nY2NhLmNybDCBuAYDVR0gBIGwMIGtMGQGC2CGWoTirh2EiAUEMFUwUwYIKwYBBQUH\nAgEWR2h0dHA6Ly91Y2UuZ3ViLnV5L2luZm9ybWFjaW9uLXRlY25pY2EvcG9saXRp\nY2FzL2NwX3BlcnNvbmFfanVyaWRpY2EucGRmMEUGC2CGWoTirh2EiAUGMDYwNAYI\nKwYBBQUHAgEWKGh0dHA6Ly9hbmNjYS5jb3JyZW8uY29tLnV5L2FuY2NhL2Nwcy5w\nZGYwEwYDVR0lBAwwCgYIKwYBBQUHAwIwHQYDVR0OBBYEFKifxRoBzjbGPp/XN66k\nutc5W/mnMB8GA1UdIwQYMBaAFGzisCaNW9YmCB+YXWngDn9V7K52MA0GCSqGSIb3\nDQEBCwUAA4ICAQCrXqOJPypSwLy3BGoxGqgXBPKESL+94N1dh+GqwOpYzQ8WEuFg\npJDiiZ44sl9K8U1KMgR7JI4AHX/9Fb4G0C/w7Z19pruE6JqLb0jx2EY1LbGLXMlB\nfy0isS6Mp0QOjjFhulqtKdGOwHMValEvLdmaiz4Nljl1txUZP/3poIihympuHjXL\nLp2m0oSnUPvN3y9Aw6wSr/cbzcHWgbYgcTlpAjCgOnWeT0/1Y96X+BEA5ZViPmuO\niyIAg8Vp/hUOWZbpYrwU94hs6JCTF4jXB3S+0kTGw/q2g1W67AKIAcBK0a86XCfP\n6fQYtojabtvn5ODBQwOEguJCLixe/qvN1Zwz1FsN+mEe/nsXlcLsY0wBOYMrlFsP\nN2UA8GPBf+ctv0Wr+99CqWC8LOHRGrl2VG2gXfAkacFAWKuQj7hwA58gtf0fD9Lh\nd9qZ0BUQMtua+j2clBV+F7nXwmxvxdvgs0YL051dc2dyfswr2gxsFkSH+ERLAazI\nyCxXOhMSZeRxzX613KeNmjln5wgbVlyJama66Uz6lrYmdB9IykUUZy3y+5M0sXM1\n0E1Ds2GD30cdE1gLQLUScCJqnJsEhbeM2cMmLymbd0jCosCaZguA8ZnTWXaug+YI\nGgMVvTMscrM9yR1uoi09HFJqZguHG84ZeD15fqF+5nUyXRXzL/zFTXYfAA==\n-----END CERTIFICATE-----`
      }

    }
    sig.loadSignature('<Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" /><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" /><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" /><DigestValue>2V+IGg7FSkSTvcsUq8Zjw1aj7IA=</DigestValue></Reference></SignedInfo><SignatureValue>lVhw/gXma+CtgPX+DhFJsL1RhApd6G8x+Xn1XIQ50b85gJzTbL1UWG5i98k317xn+CcxfoP8dlzksGdH/K407yll0dd2/gvl40AR4NUlkiwlwe6YmqpucV9vYaa6xGjsuatOcNyVQPFDcZAdyoAcuIBo5Y18oLnldeA9QiQVW/L/uQ+0R0+TukGHud0Cx1gSyO7WasBgaJGwj1VB7PiE5pdnwnhJwaxvHbiwJ66yPa55t/aNG5oBB00Z3OtKbioGEb0GN3fqXJMeKKJJHVk7ZLR2w3ZGuBmFBeDdYX/rLBsrSJ6bGM5N1Ulbhhxp6D4woBdNLS3ksCMcXgRFG58tZg==</SignatureValue><KeyInfo><X509Data><X509IssuerSerial><X509IssuerName>C=UY, O=Administración Nacional de Correos, CN=Correo Uruguayo - CA</X509IssuerName><X509SerialNumber>3544998245604977353117057787262343205687501516</X509SerialNumber></X509IssuerSerial></X509Data></KeyInfo></Signature>')

    let sigIsValid = sig.checkSignature('<nsAd:CFE xmlns:nsAd="http://cfe.dgi.gub.uy" version="1.0"><nsAd:eFact><nsAd:TmstFirma>2016-10-31T15:05:14Z</nsAd:TmstFirma><nsAd:Encabezado><nsAd:IdDoc><nsAd:TipoCFE>112</nsAd:TipoCFE><nsAd:Serie>A</nsAd:Serie><nsAd:Nro>315857</nsAd:Nro><nsAd:FchEmis>2016-10-31</nsAd:FchEmis><nsAd:PeriodoDesde>2016-10-31</nsAd:PeriodoDesde><nsAd:PeriodoHasta>2016-10-31</nsAd:PeriodoHasta><nsAd:MntBruto>1</nsAd:MntBruto><nsAd:FmaPago>2</nsAd:FmaPago><nsAd:FchVenc>2016-10-31</nsAd:FchVenc></nsAd:IdDoc><nsAd:Emisor><nsAd:RUCEmisor>211677800019</nsAd:RUCEmisor><nsAd:RznSoc>Blanqueo SA</nsAd:RznSoc><nsAd:NomComercial>Blanqueo  Durazno S.A.</nsAd:NomComercial><nsAd:GiroEmis>Comercio por Menor de Combustible para Vehiculos</nsAd:GiroEmis><nsAd:Telefono>4363 - 1267</nsAd:Telefono><nsAd:CorreoEmisor>info@zenga.com.uy</nsAd:CorreoEmisor><nsAd:EmiSucursal>Principal</nsAd:EmiSucursal><nsAd:CdgDGISucur>5</nsAd:CdgDGISucur><nsAd:DomFiscal>Ruta 5 Km 182.300</nsAd:DomFiscal><nsAd:Ciudad>Durazno</nsAd:Ciudad><nsAd:Departamento>Durazno</nsAd:Departamento></nsAd:Emisor><nsAd:Receptor><nsAd:TipoDocRecep>2</nsAd:TipoDocRecep><nsAd:CodPaisRecep>UY</nsAd:CodPaisRecep><nsAd:DocRecep>180067050012</nsAd:DocRecep><nsAd:RznSocRecep>GUSTAVO KENT</nsAd:RznSocRecep><nsAd:DirRecep>DURAZNO</nsAd:DirRecep><nsAd:CiudadRecep>Montevideo</nsAd:CiudadRecep><nsAd:DeptoRecep /><nsAd:PaisRecep>Uruguay</nsAd:PaisRecep></nsAd:Receptor><nsAd:Totales><nsAd:TpoMoneda>UYU</nsAd:TpoMoneda><nsAd:TpoCambio>1</nsAd:TpoCambio><nsAd:MntNoGrv>0</nsAd:MntNoGrv><nsAd:MntExpoyAsim>0</nsAd:MntExpoyAsim><nsAd:MntImpuestoPerc>0</nsAd:MntImpuestoPerc><nsAd:MntIVaenSusp>0</nsAd:MntIVaenSusp><nsAd:MntNetoIvaTasaMin>0</nsAd:MntNetoIvaTasaMin><nsAd:MntNetoIVATasaBasica>530.29</nsAd:MntNetoIVATasaBasica><nsAd:MntNetoIVAOtra>0</nsAd:MntNetoIVAOtra><nsAd:IVATasaMin>10</nsAd:IVATasaMin><nsAd:IVATasaBasica>22</nsAd:IVATasaBasica><nsAd:MntIVATasaMin>0</nsAd:MntIVATasaMin><nsAd:MntIVATasaBasica>116.66</nsAd:MntIVATasaBasica><nsAd:MntIVAOtra>0</nsAd:MntIVAOtra><nsAd:MntTotal>646.95</nsAd:MntTotal><nsAd:MntTotRetenido>0</nsAd:MntTotRetenido><nsAd:CantLinDet>2</nsAd:CantLinDet><nsAd:MontoNF>0.01</nsAd:MontoNF><nsAd:MntPagar>646.96</nsAd:MntPagar></nsAd:Totales></nsAd:Encabezado><nsAd:Detalle><nsAd:Item><nsAd:NroLinDet>1</nsAd:NroLinDet><nsAd:CodItem><nsAd:TpoCod>1</nsAd:TpoCod><nsAd:Cod>2222</nsAd:Cod></nsAd:CodItem><nsAd:IndFact>3</nsAd:IndFact><nsAd:NomItem>Bonificacion  por gas oil</nsAd:NomItem><nsAd:DscItem /><nsAd:Cantidad>16.717</nsAd:Cantidad><nsAd:UniMed>1</nsAd:UniMed><nsAd:PrecioUnitario>38.700000</nsAd:PrecioUnitario><nsAd:MontoItem>646.95</nsAd:MontoItem></nsAd:Item><nsAd:Item><nsAd:NroLinDet>2</nsAd:NroLinDet><nsAd:CodItem><nsAd:TpoCod>1</nsAd:TpoCod><nsAd:Cod /></nsAd:CodItem><nsAd:IndFact>6</nsAd:IndFact><nsAd:NomItem>Ajuste de Redondeo</nsAd:NomItem><nsAd:DscItem /><nsAd:Cantidad>1</nsAd:Cantidad><nsAd:UniMed /><nsAd:PrecioUnitario>0.010000</nsAd:PrecioUnitario><nsAd:DescuentoPct>0</nsAd:DescuentoPct><nsAd:DescuentoMonto>0</nsAd:DescuentoMonto><nsAd:RecargoPct>0</nsAd:RecargoPct><nsAd:RecargoMnt>0</nsAd:RecargoMnt><nsAd:MontoItem>0.01</nsAd:MontoItem></nsAd:Item></nsAd:Detalle><nsAd:SubTotInfo /><nsAd:DscRcgGlobal /><nsAd:MediosPago /><nsAd:Referencia><nsAd:Referencia><nsAd:NroLinRef>1</nsAd:NroLinRef><nsAd:TpoDocRef>111</nsAd:TpoDocRef><nsAd:Serie>A</nsAd:Serie><nsAd:NroCFERef>328037</nsAd:NroCFERef><nsAd:RazonRef>2016-10-24:111:A:328037</nsAd:RazonRef><nsAd:FechaCFEref>2016-10-24</nsAd:FechaCFEref></nsAd:Referencia><nsAd:Referencia><nsAd:NroLinRef>2</nsAd:NroLinRef><nsAd:TpoDocRef>111</nsAd:TpoDocRef><nsAd:Serie>A</nsAd:Serie><nsAd:NroCFERef>328119</nsAd:NroCFERef><nsAd:RazonRef>2016-10-25:111:A:328119</nsAd:RazonRef><nsAd:FechaCFEref>2016-10-25</nsAd:FechaCFEref></nsAd:Referencia></nsAd:Referencia><nsAd:CAEData><nsAd:CAE_ID>90160095897</nsAd:CAE_ID><nsAd:DNro>315001</nsAd:DNro><nsAd:HNro>615000</nsAd:HNro><nsAd:FecVenc>2018-06-10</nsAd:FecVenc></nsAd:CAEData></nsAd:eFact><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" /><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" /><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" /><DigestValue>2V+IGg7FSkSTvcsUq8Zjw1aj7IA=</DigestValue></Reference></SignedInfo><SignatureValue>lVhw/gXma+CtgPX+DhFJsL1RhApd6G8x+Xn1XIQ50b85gJzTbL1UWG5i98k317xn+CcxfoP8dlzksGdH/K407yll0dd2/gvl40AR4NUlkiwlwe6YmqpucV9vYaa6xGjsuatOcNyVQPFDcZAdyoAcuIBo5Y18oLnldeA9QiQVW/L/uQ+0R0+TukGHud0Cx1gSyO7WasBgaJGwj1VB7PiE5pdnwnhJwaxvHbiwJ66yPa55t/aNG5oBB00Z3OtKbioGEb0GN3fqXJMeKKJJHVk7ZLR2w3ZGuBmFBeDdYX/rLBsrSJ6bGM5N1Ulbhhxp6D4woBdNLS3ksCMcXgRFG58tZg==</SignatureValue><KeyInfo><X509Data><X509IssuerSerial><X509IssuerName>C=UY, O=Administración Nacional de Correos, CN=Correo Uruguayo - CA</X509IssuerName><X509SerialNumber>3544998245604977353117057787262343205687501516</X509SerialNumber></X509IssuerSerial></X509Data></KeyInfo></Signature></nsAd:CFE>')

    test.ok(sigIsValid)
    test.done()
  },
  "set de prueba DGI": (test) => {
     let sig = new SignedXml('wssecurity', { inclusiveNamespacesPrefixList: ['xd'] })
    sig.keyInfoProvider = {
      getKey: () => {
        return `-----BEGIN CERTIFICATE-----\nMIIGCjCCA/KgAwIBAgIQdS6kc64U24dWp8vj5jmtuTANBgkqhkiG9w0BAQUFADB6\nMQswCQYDVQQGEwJVWTErMCkGA1UECgwiQURNSU5JU1RSQUNJT04gTkFDSU9OQUwg\nREUgQ09SUkVPUzEfMB0GA1UECwwWU0VSVklDSU9TIEVMRUNUUk9OSUNPUzEdMBsG\nA1UEAwwUQ29ycmVvIFVydWd1YXlvIC0gQ0EwHhcNMTYwMTI2MTk0MTIzWhcNMTcw\nMTI2MTk0MTIzWjCB9DEiMCAGCSqGSIb3DQEJARYTZ2Rvcm5lbGxAZGdpLmd1Yi51\neTEeMBwGA1UECwwVU0VHVVJJREFEIElORk9STUFUSUNBMRgwFgYDVQQLDA9TT1BP\nUlRFIFRFQ05JQ08xHDAaBgNVBAsME1NPUE9SVEUgREUgU0lTVEVNQVMxHDAaBgNV\nBAoME0RHSS1SVUMgUFJVRUJBIENFREUxEzARBgNVBAgMCk1vbnRldmlkZW8xCzAJ\nBgNVBAYTAlVZMRgwFgYDVQQFEw9SVUMyMTk5OTk4MzAwMTkxHDAaBgNVBAMME0RH\nSS1SVUMgUFJVRUJBIENFREUwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBANGG\neNF/8Z+KIudfpyHq/Do+WHzXbD87xxbDv+fEfZvRfi3J78+9lNq9vzb8hAJ3OEkm\nbhD+JkGCr32VdwGN6becgnP+ChBDYAGf+qmVWZcOiVzOrMorCHl1vMsnLt6DFGTQ\njNGAVIua1X3phYokwFSJzXWP0KIvPUw/L+/nYykLAgMBAAGjggGTMIIBjzBPBgNV\nHREESDBGoC8GCisGAQQBgjcUAgOgIQwfSURFMjg3OTM3MDYvR1VJTExFUk1PIERP\nUk5FTExFU4ETZ2Rvcm5lbGxAZGdpLmd1Yi51eTAMBgNVHRMBAf8EAjAAMA4GA1Ud\nDwEB/wQEAwID+DAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwEQYJYIZI\nAYb4QgEBBAQDAgWgMB0GA1UdDgQWBBT8VTSlHeNtrZAd2kFvJf+605N9xjAfBgNV\nHSMEGDAWgBQlj99DL45qugu+RlxXUJO3Ub782TBUBgNVHSAETTBLMEkGDCsGAQQB\ngfVPAQEBBDA5MDcGCCsGAQUFBwIBFitodHRwOi8vd3d3LmNvcnJlby5jb20udXkv\nY29ycmVvY2VydC9jcHMucGRmMBgGDSsGAQQBgfVPAQEBBAEEBwwFRGlzY28wPAYD\nVR0fBDUwMzAxoC+gLYYraHR0cDovL3d3dy5jb3JyZW8uY29tLnV5L0NvcnJlb0Nl\ncnQvYW5jLmNybDANBgkqhkiG9w0BAQUFAAOCAgEAp6+ZPWAZbF+uj6H6EtDUjHk9\n5Cp5Eu1xNT+n+NG3g/AEZCbC7R9n9pu6os0H9Xc/JDl5tVpAcP41bWnj3W/g6f70\nImHglj01osWrQclyf/rzjgs3c9m3TDuWw1hFP3td2r3pts22YdCDnm6Q8UctZ6Tg\nbm1r3ndtmAOAFd/JdI4kX5Qu3T6P0cEGd24rzWXOMWCAZLTilV2lpl4PpPTW1Yqw\n1xoiWYYVHZKYDq5kerX1fCY3L/nlXGfca7VkGkOdXrNtX6m+ST5v35EQ1C+DP2Ln\nAotBQpCFsuDFMv6E29CwXJoyuNWaQ7siWoa/vEaMtSvtvUYt6/kOfSlgp2dqePTJ\nvGU+cGFje2vaxKB7h7RqA3tZkcAIYTeO4MEwaf88T39gj7H4199fDxdc+m3TGB9h\nLVAz2z3Qk4TmBcNhs4JmwEYFX+3JeGnrEC9n4L4WVMHquPvrvxleEBBi4bc4bUDo\nSwdfqPfXaUaQkGs/TAouQpi3Ew7REn28kivdzQSdW1BRE3cVnPOo3CKdEvOzPrSh\nsxjaGoKgZpJu0IPMPzxtlv5wmUJHNViJEKFOH06w734rFNnE46r3dKWg51kHL16j\n2rZz0vCo6iJAmzkwhfw6EeoRKXIUfZs+zat6gWivizXpBL1H0f3pV+MP6rt+y7xn\nT2bSB3gVROs1teRe08c=\n-----END CERTIFICATE-----`
      }

    }
    sig.loadSignature(`<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
<SignedInfo>
  <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
  <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
  <Reference URI="">
    <Transforms>
      <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
      <Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
    </Transforms>
    <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
    <DigestValue>4nruWC6Gxtn9esPdduBbICg0QcI=</DigestValue>
  </Reference>
</SignedInfo>
    <SignatureValue>Kg81HFMlRZWwkLbZbgJq8zJl0vLOsaecDyYLAKzfZmCOhsh4rHzh/ZnwRGukBW8vBnA7Npdi6C/RaIHrU4PsdoZvUgzqtY6kq5yfR/6hzr9Co9PSc1MSz7xy48dvpMI7bev2H5cp9QwqdYkuhs8knS55V7bYEDLUIhZRAo+aUEA=</SignatureValue><KeyInfo><X509Data><X509IssuerSerial><X509IssuerName>CN=Correo Uruguayo - CA, OU=SERVICIOS ELECTRONICOS, O=ADMINISTRACION NACIONAL DE CORREOS, C=UY</X509IssuerName><X509SerialNumber>155761856642617054135126896023459966393</X509SerialNumber></X509IssuerSerial></X509Data></KeyInfo></Signature>`)

    let sigIsValid = sig.checkSignature(`<ns0:CFE xmlns:ns0="http://cfe.dgi.gub.uy" version="1.0"><ns0:eFact><ns0:TmstFirma>2016-09-01T11:08:41-03:00</ns0:TmstFirma><ns0:Encabezado><ns0:IdDoc><ns0:TipoCFE>111</ns0:TipoCFE><ns0:Serie>A</ns0:Serie><ns0:Nro>3</ns0:Nro><ns0:FchEmis>2016-09-01</ns0:FchEmis><ns0:FmaPago>1</ns0:FmaPago></ns0:IdDoc><ns0:Emisor><ns0:RUCEmisor>219999830019</ns0:RUCEmisor><ns0:RznSoc>DGI</ns0:RznSoc><ns0:CdgDGISucur>1</ns0:CdgDGISucur><ns0:DomFiscal>FERNANDEZ CRESPO AVDA. DANIEL 1534</ns0:DomFiscal><ns0:Ciudad>MONTEVIDEO</ns0:Ciudad><ns0:Departamento>MONTEVIDEO</ns0:Departamento></ns0:Emisor><ns0:Receptor><ns0:TipoDocRecep>2</ns0:TipoDocRecep><ns0:CodPaisRecep>UY</ns0:CodPaisRecep><ns0:DocRecep>180067050012</ns0:DocRecep><ns0:RznSocRecep>KENT BURGOS GUSTAVO RANDERS</ns0:RznSocRecep><ns0:DirRecep>RODO, JOSE ENRIQUE</ns0:DirRecep><ns0:CiudadRecep>PALMITAS</ns0:CiudadRecep></ns0:Receptor><ns0:Totales><ns0:TpoMoneda>UYU</ns0:TpoMoneda><ns0:MntNoGrv>0.00</ns0:MntNoGrv><ns0:MntNetoIvaTasaMin>0.00</ns0:MntNetoIvaTasaMin><ns0:MntNetoIVATasaBasica>10000.00</ns0:MntNetoIVATasaBasica><ns0:IVATasaMin>10</ns0:IVATasaMin><ns0:MntIVATasaMin>1000.00</ns0:MntIVATasaMin><ns0:MntIVATasaBasica>0.00</ns0:MntIVATasaBasica><ns0:MntTotal>11000.00</ns0:MntTotal><ns0:CantLinDet>1</ns0:CantLinDet><ns0:MontoNF>0</ns0:MontoNF><ns0:MntPagar>11000.00</ns0:MntPagar></ns0:Totales></ns0:Encabezado><ns0:Detalle><ns0:Item><ns0:NroLinDet>1</ns0:NroLinDet><ns0:IndFact>2</ns0:IndFact><ns0:NomItem>eee</ns0:NomItem><ns0:Cantidad>10</ns0:Cantidad><ns0:UniMed>uds</ns0:UniMed><ns0:PrecioUnitario>1000</ns0:PrecioUnitario><ns0:MontoItem>10000.00</ns0:MontoItem></ns0:Item></ns0:Detalle><ns0:CAEData><ns0:CAE_ID>90110002895</ns0:CAE_ID><ns0:DNro>1</ns0:DNro><ns0:HNro>100</ns0:HNro><ns0:FecVenc>2016-12-31</ns0:FecVenc></ns0:CAEData></ns0:eFact><Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
<SignedInfo>
  <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
  <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
  <Reference URI="">
    <Transforms>
      <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
      <Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
    </Transforms>
    <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
    <DigestValue>4nruWC6Gxtn9esPdduBbICg0QcI=</DigestValue>
  </Reference>
</SignedInfo>
    <SignatureValue>Kg81HFMlRZWwkLbZbgJq8zJl0vLOsaecDyYLAKzfZmCOhsh4rHzh/ZnwRGukBW8vBnA7Npdi6C/RaIHrU4PsdoZvUgzqtY6kq5yfR/6hzr9Co9PSc1MSz7xy48dvpMI7bev2H5cp9QwqdYkuhs8knS55V7bYEDLUIhZRAo+aUEA=</SignatureValue><KeyInfo><X509Data><X509IssuerSerial><X509IssuerName>CN=Correo Uruguayo - CA, OU=SERVICIOS ELECTRONICOS, O=ADMINISTRACION NACIONAL DE CORREOS, C=UY</X509IssuerName><X509SerialNumber>155761856642617054135126896023459966393</X509SerialNumber></X509IssuerSerial></X509Data></KeyInfo></Signature></ns0:CFE>`)

    test.ok(sigIsValid)
    test.done()
  },
   "Prueba Firma de Sobre Sob_211003420017_20161031_3305528": (test) => {
     let sig = new SignedXml('wssecurity',{ inclusiveNamespacesPrefixList: ['xd'] })
    sig.keyInfoProvider = {
      getKey: () => {
        return `-----BEGIN CERTIFICATE-----\nMIIGQjCCBCqgAwIBAgITGyaJj2Bj9psXxQFVZ1ugbpGi7TANBgkqhkiG9w0BAQsF\nADBaMR0wGwYDVQQDExRDb3JyZW8gVXJ1Z3VheW8gLSBDQTEsMCoGA1UECgwjQWRt\naW5pc3RyYWNpw7NuIE5hY2lvbmFsIGRlIENvcnJlb3MxCzAJBgNVBAYTAlVZMB4X\nDTE0MTAyODE2MDYxNVoXDTE2MTAyNzE2MDYxNVowbzEYMBYGA1UEBRMPUlVDMjEx\nMDAzNDIwMDE3MQswCQYDVQQGEwJVWTE2MDQGA1UEChMtQURNSU5JU1RSQUNJT04g\nTkFDSU9OQUwgREUgVEVMRUNPTVVOSUNBQ0lPTkVTMQ4wDAYDVQQDEwVBTlRFTDCC\nASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMtLKyoW/Hdq9oL2RgbyuzWo\nq3OF+ngBNVqvn0iOPr3phTLrpk8SeG/TE6Fcm0HbWGf8uKMibreBOj1/WLtft96E\nOiAv+e7FMlUc35BEoxq4vcJ3/3D+TXDSYNdIXXl5ggesxlIvTIcUpj52R9nbJEVU\n05EtgjDm56266ahWX/3zsAb1R1jnkFe60pnHBvzbWH2l2Pc5za5H+w3tgRJF9rQN\n2XmJED+ZxsioyDDYJQA9KVdoKDqejxfsqahKMAHqgGIjHFPiw3UppO4m2/LTlJoW\nb14VYljuOrlglfR6ZVMHo0onOdoORafdAdUQk5uMxxSuxhf8Dv27MCSqKezoc9cC\nAwEAAaOCAeowggHmMHkGCCsGAQUFBwEBBG0wazA2BggrBgEFBQcwAoYqaHR0cDov\nL2FuY2NhLmNvcnJlby5jb20udXkvYW5jY2EvYW5jY2EuY2VyMDEGCCsGAQUFBzAB\nhiVodHRwOi8vYW5jY2EuY29ycmVvLmNvbS51eS9hbmNjYS9PQ1NQMA4GA1UdDwEB\n/wQEAwIE8DAMBgNVHRMBAf8EAjAAMDsGA1UdHwQ0MDIwMKAuoCyGKmh0dHA6Ly9h\nbmNjYS5jb3JyZW8uY29tLnV5L2FuY2NhL2FuY2NhLmNybDCBuAYDVR0gBIGwMIGt\nMGQGC2CGWoTirh2EiAUEMFUwUwYIKwYBBQUHAgEWR2h0dHA6Ly91Y2UuZ3ViLnV5\nL2luZm9ybWFjaW9uLXRlY25pY2EvcG9saXRpY2FzL2NwX3BlcnNvbmFfanVyaWRp\nY2EucGRmMEUGC2CGWoTirh2EiAUGMDYwNAYIKwYBBQUHAgEWKGh0dHA6Ly9hbmNj\nYS5jb3JyZW8uY29tLnV5L2FuY2NhL2Nwcy5wZGYwEwYDVR0lBAwwCgYIKwYBBQUH\nAwIwHQYDVR0OBBYEFCYKt2ng5WszoySYWf0wr35AnQM3MB8GA1UdIwQYMBaAFGzi\nsCaNW9YmCB+YXWngDn9V7K52MA0GCSqGSIb3DQEBCwUAA4ICAQAA+uql/WE8CppP\nT/ZvBE4B4YTT7E2nghYWN5IxiZzF84OxFE6Fcn/GVywSHfyLtUEINefR7xjDYKtF\n6mx2VB5msJqabCVzrDMOfMdbgJrI42rL37f8OcF5qUx8UFYLh3FWgg9E2fQW5ysG\nPn0jC2baBkdgwD41SC5Rt4sfkKku43mF7LXtsjEY7FzAX04TH5bLeIgypJEuUwdQ\nDpPHrYznCxJE/kfh3SrsbxqwhmMN2zbvcfvyT9Zbi1gWSEPplqmQLHEF/4JR24qu\n1sfbkUhoOGV0gjmXEaIyoIO/yzbrsjRfRZsIsHigXQ2LJ5mWcYSyenXCUPCllAWE\nrxHQhtXd6OQBlcaEkja4xQfvzWWVJUqGGfpcKNJulx47mqUn2jGUSWxNgdiqsiKe\n5Fsg/UDA8zpQogyM4Yt4cz3jyLRosfA2lbfleeF2u02G76h27OmIy5KaTdu5HRvr\n9AYd0bV9vOwuNeNv4Jj3f31Mzn5uznmQXAqD/3PfN0tx3vgb12bmGEMP71N7F2r2\n/WUebPrdiBMT6HaKXgufamuen5wvBQSCsqdKp4dz7sHRZ3mbTOhpSZ6wcvoAw3WO\nIlkimAQGi3LyPcbT5qTLvPVSQprC141UWNgwmH/kXUXUvKp40k0NTBWEekYmoeoQ\n3RNnQf+fOhP66OvCDbwhgxyQH45slw==\n-----END CERTIFICATE-----`
      }

    }
    sig.loadSignature(`<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
<ds:SignedInfo>
<ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
<ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
<ds:Reference URI="">
<ds:Transforms>
<ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
<ds:Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
</ds:Transforms>
<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
<ds:DigestValue>fgOrjuOmmDEXkruteO6rxnKoj5o=</ds:DigestValue>
</ds:Reference>
</ds:SignedInfo>
<ds:SignatureValue>
Sxn73yUDV/gNZbfWRug04rGc8aQwUrEgExtFUMIR2XUzm2vURjLfvjfx5/88qaoVK6MAnTj/zGCt
DlyP6L1Chgld7RjU2vT+Ma2jkBNJP3bqL4GotMFH9JjT63ENyBh0+F1d8E7PC97uUPCoFWo5V3oR
tsRElXBm5rie9oGtAF7AMrjj09wrUe2MxZk0FBj3Ows94EX0ixcSEwLi1N+Nr1R+5MnKLwyY4vgP
rR5RnQbtFRRkEZl0RZVgymb0vUn1vyO93yHGD7v2e7O01MiOcbH6oEruuQFXkHrum1ADtUa1TMAl
uTuWpCx/UnhxXDSTg3fUL4WGucRcgPUNlbH5Ew==
</ds:SignatureValue>
<ds:KeyInfo>
<ds:X509Data>
<ds:X509IssuerSerial>
<ds:X509IssuerName>C=UY,O=Administración Nacional de Correos,CN=Correo Uruguayo - CA</ds:X509IssuerName>
<ds:X509SerialNumber>605477196490093275103496032803655889059947245</ds:X509SerialNumber>
</ds:X509IssuerSerial>
</ds:X509Data>
</ds:KeyInfo>
</ds:Signature>`)

    let sigIsValid = sig.checkSignature(`<CFE version="1.0" xmlns="http://cfe.dgi.gub.uy" xmlns:xd="http://www.w3.org/2000/09/xmldsig#">
  <eFact>
    <TmstFirma>2016-10-18T16:00:45-03:00</TmstFirma>
    <Encabezado>
      <IdDoc>
        <TipoCFE>111</TipoCFE>
        <Serie>B</Serie>
        <Nro>7685071</Nro>
        <FchEmis>2016-10-18</FchEmis>
        <PeriodoDesde>2016-10-01</PeriodoDesde>
        <PeriodoHasta>2016-10-31</PeriodoHasta>
        <FmaPago>2</FmaPago>
        <FchVenc>2016-10-18</FchVenc>
      </IdDoc>
      <Emisor>
        <RUCEmisor>211003420017</RUCEmisor>
        <RznSoc>Administración Nacional de Telecomunicaciones</RznSoc>
        <NomComercial>ANTEL</NomComercial>
        <GiroEmis>Telecomunicaciones</GiroEmis>
        <Telefono>29280000</Telefono>
        <CorreoEmisor>GS-CONCILIACIONES@MAIL.ANTEL.COM.UY</CorreoEmisor>
        <EmiSucursal/>
        <CdgDGISucur>1</CdgDGISucur>
        <DomFiscal>Guatemala 1075 (11800)</DomFiscal>
        <Ciudad>Montevideo</Ciudad>
        <Departamento>Montevideo</Departamento>
      </Emisor>
      <Receptor>
        <TipoDocRecep>2</TipoDocRecep>
        <CodPaisRecep>UY</CodPaisRecep>
        <DocRecep>180067050012</DocRecep>
        <RznSocRecep>KENT BURGOS GUSTAVO RANDERS</RznSocRecep>
        <DirRecep>BVAR CONT BOULEVARD RODO</DirRecep>
        <CiudadRecep>PALMITAS</CiudadRecep>
      </Receptor>
      <Totales>
        <TpoMoneda>UYU</TpoMoneda>
        <TpoCambio>1.00</TpoCambio>
        <MntNoGrv>0.00</MntNoGrv>
        <MntNetoIVATasaBasica>0.00</MntNetoIVATasaBasica>
        <IVATasaBasica>22.000</IVATasaBasica>
        <MntIVATasaBasica>0.00</MntIVATasaBasica>
        <MntTotal>0.00</MntTotal>
        <CantLinDet>1</CantLinDet>
        <MontoNF>0.00</MontoNF>
        <MntPagar>0.00</MntPagar>
      </Totales>
    </Encabezado>
    <Detalle>
      <Item>
        <NroLinDet>1</NroLinDet>
        <IndFact>3</IndFact>
        <NomItem>SERVICIOS DE TELECOMUNICACIONES GRAVADOS</NomItem>
        <DscItem>MOVIL</DscItem>
        <Cantidad>1</Cantidad>
        <UniMed>N/A</UniMed>
        <PrecioUnitario>53.28</PrecioUnitario>
        <DescuentoPct>0</DescuentoPct>
        <DescuentoMonto>53.28</DescuentoMonto>
        <MontoItem>0.00</MontoItem>
      </Item>
    </Detalle>
    <CAEData>
      <CAE_ID>90160002112</CAE_ID>
      <DNro>7636001</DNro>
      <HNro>7836000</HNro>
      <FecVenc>2018-01-10</FecVenc>
    </CAEData>
  </eFact>
  
<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
<ds:SignedInfo>
<ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
<ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
<ds:Reference URI="">
<ds:Transforms>
<ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
<ds:Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
</ds:Transforms>
<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
<ds:DigestValue>fgOrjuOmmDEXkruteO6rxnKoj5o=</ds:DigestValue>
</ds:Reference>
</ds:SignedInfo>
<ds:SignatureValue>
Sxn73yUDV/gNZbfWRug04rGc8aQwUrEgExtFUMIR2XUzm2vURjLfvjfx5/88qaoVK6MAnTj/zGCt
DlyP6L1Chgld7RjU2vT+Ma2jkBNJP3bqL4GotMFH9JjT63ENyBh0+F1d8E7PC97uUPCoFWo5V3oR
tsRElXBm5rie9oGtAF7AMrjj09wrUe2MxZk0FBj3Ows94EX0ixcSEwLi1N+Nr1R+5MnKLwyY4vgP
rR5RnQbtFRRkEZl0RZVgymb0vUn1vyO93yHGD7v2e7O01MiOcbH6oEruuQFXkHrum1ADtUa1TMAl
uTuWpCx/UnhxXDSTg3fUL4WGucRcgPUNlbH5Ew==
</ds:SignatureValue>
<ds:KeyInfo>
<ds:X509Data>
<ds:X509IssuerSerial>
<ds:X509IssuerName>C=UY,O=Administración Nacional de Correos,CN=Correo Uruguayo - CA</ds:X509IssuerName>
<ds:X509SerialNumber>605477196490093275103496032803655889059947245</ds:X509SerialNumber>
</ds:X509IssuerSerial>
</ds:X509Data>
</ds:KeyInfo>
</ds:Signature></CFE>`)

    test.ok(sigIsValid)
    test.done()
  }
}





