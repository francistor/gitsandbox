load("urlConfig.js");

print("");
print("----------------------------------");
print("Creating nodes configuration");
print("----------------------------------");

var db=connect(leverConfigDatabase.substring(10));
db.nodes.drop();

var samsung=
{
    "_version": 1001,
	"hostName": "samsung-jativa",

    "radius": {
        "_version": 1001,
        "IPAddress": 0,
        "authPort": 1812,
        "acctPort": 1813,

        "clients": [
            {"name": "radiusTool", "IPAddress": "127.0.0.1", "secret": "secret", "class": "none"},
            {"name": "lever-toshiba", "IPAddress": "192.168.1.102", "secret": "secret", "class": "none"}
        ],

        "servers": [],

        "serverGroups": [],

        "baseClientPort": 40000,
        "numClientPorts": 10
    },

    "diameter": {
        "IPAddress-not-used": "127.0.0.1",
        "port": 3868,
        "diameterHost": "lever-samsung",
        "diameterRealm": "samsung",
        "vendorId": 1101,
        "productName": "Lever",
        "firmwareRevision": 1,
        "connectionInterval": 10000,
        "peers": [
            {
                "name": "diameterTool",
                "diameterHost": "diameterTool",
                "IPAddress": "127.0.0.1:3868",
                "connectionPolicy": "passive"
            },
            {
                "name": "8950AAA-samsung",
                "diameterHost": "8950AAA",
                "IPAddress": "192.168.1.101:13868",
                "connectionPolicy": "active",
                "watchdogInterval": 10000
            },
            {
                "name": "lever-toshiba",
                "diameterHost": "lever-toshiba",
                "IPAddress": "192.168.1.102:3868",
                "connectionPolicy": "active",
                "watchdogInterval": 10000
            },
            {
                "name": "lever-ec2",
                "diameterHost": "lever-ec2",
                "IPAddress": "54.154.7.88:3868",
                "connectionPolicy": "active",
                "watchdogInterval": 10000
            }
        ],

        "routes": [
            {"realm": "*", "applicationId": "*", "peers": ["8950AAA"], "policy": "fixed"}
        ],

        "baseClientPort": 40000,
        "numClientPorts": 10
    },

    "management":{
        "IPAddress": "samsung.jativa",
        "httpPort": 9000
    }
};

var toshiba=
{
    "_version": 1001,
    "hostName": "frodriguezgpw7",

    "radius": {
        "_version": 1001,
        "IPAddress": 0,
        "authPort": 1812,
        "acctPort": 1813,

        "clients": [
            {"name": "radiusTool", "IPAddress": "127.0.0.1", "secret": "secret", "class": "none"},
            {"name": "lever-samsung", "IPAddress": "192.168.1.101", "secret": "secret", "class": "none"}
        ],

        "servers": [
            {"name": "8950AAA-toshiba", "IPAddress": "127.0.0.1", "secret": "secret", "class": "none", "ports": {"Access-Request": 11812, "Accounting-Request": 11813, "CoA-Request": 13799}, "timeoutMillis": 1000, "tries": 1, "errorThreshold": 2, "quarantineTimeMillis": 3000},
            {"name": "8950AAA-samsung", "IPAddress": "192.168.1.101", "secret": "secret", "class": "none", "ports": {"Access-Request": 11812, "Accounting-Request": 11813, "CoA-Request": 13799}, "timeoutMillis": 1000, "tries": 1, "errorThreshold": 2, "quarantineTimeMillis": 3000},
            {"name": "lever-samsung", "IPAddress": "192.168.1.101", "secret": "secret", "class": "none", "ports": {"Access-Request": 1812, "Accounting-Request": 1813, "CoA-Request": 3799}, "timeoutMillis": 1000, "tries": 1, "errorThreshold": 10, "quarantineTimeMillis": 3000},
            {"name": "ec2", "IPAddress": "54.154.7.88", "secret": "secret", "class": "none", "ports": {"Access-Request": 1812, "Accounting-Request": 1813, "CoA-Request": 3799}, "timeoutMillis": 1000, "tries": 1, "errorThreshold": 10, "quarantineTimeMillis": 3000}
        ],

        "serverGroups": [
            {"name": "local", "servers": ["8950AAA-toshiba"], "policy": "random"},
            {"name": "remote", "servers": ["8950AAA-toshiba", "8950AAA-samsung"], "policy": "random"}
        ],

        "baseClientPort": 40000,
        "numClientPorts": 10
    },

    "diameter": {
        "IPAddress-not-used": "127.0.0.1",
        "listenAddress": "0.0.0.0",
        "port": 3868,
        "diameterHost": "lever-toshiba",
        "diameterRealm": "toshiba",
        "vendorId": 1101,
        "productName": "Lever",
        "firmwareRevision": 1,
        "connectionInterval": 10000,
        "peers": [
            {
                "name": "diameterTool",
                "diameterHost": "diameterTool",
                "IPAddress": "127.0.0.1:3868",
                "connectionPolicy": "passive"
            },
            {
                "name": "8950AAA-toshiba",
                "diameterHost": "8950AAA",
                "IPAddress": "192.168.1.102:13868",
                "connectionPolicy": "active",
                "watchdogInterval": 10000
            },
            {
                "name": "lever-samsung",
                "diameterHost": "lever-samsung",
                "IPAddress": "192.168.1.101:3868",
                "connectionPolicy": "active",
                "watchdogInterval": 10000
            }
        ],

        "routes": [
            {"realm": "forward", "applicationId": "Credit-Control", "peers": ["lever-samsung", "8950AAA-toshiba"], "policy": "random"}
        ]
    },

    "management":{
        "IPAddress": "toshiba.jativa",
        "httpPort": 9000
    }
};


var ec2=
{
    "_version": 1001,
    "hostName": "ec2",

    "radius": {
        "_version": 1001,
        "IPAddress": 0,
        "authPort": 1812,
        "acctPort": 1813,

        "clients": [
            {"name": "radiusTool", "IPAddress": "127.0.0.1", "secret": "secret", "class": "none"},
            {"name": "lever-toshiba", "IPAddress": "88.12.22.122", "secret": "secret", "class": "erx"}
        ],

        "baseClientPort": 40000,
        "numClientPorts": 10
    },

    "diameter": {
        "IPAddress-not-used": "127.0.0.1",
        "port": 3868,
        "diameterHost": "lever-ec2",
        "diameterRealm": "amazon",
        "vendorId": 1101,
        "productName": "Lever",
        "firmwareRevision": 1,
        "connectionInterval": 10000,
        "peers": [
            {
                "name": "lever-samsung",
                "diameterHost": "lever-samsung",
                "IPAddress": "88.12.22.222:13868",
                "connectionPolicy": "passive",
                "watchdogInterval": 10000
            }
        ],

        "routes": [
            {"realm": "forward", "applicationId": "Credit-Control", "peers": ["lever-samsung"], "policy": "random"}
        ]
    },

    "management":{
        "IPAddress": "ec2.amazon",
        "httpPort": 9000
    }
};

db.nodes.insert(samsung);
db.nodes.insert(toshiba);
db.nodes.insert(ec2);
print("done");
print("");

print("----------------------------------");
print("Creating Dispatcher configuration");
print("----------------------------------");

db.dispatcher.drop();

var dispatcher=
{
	"_version": 1001,
	"dispatcher":{
		"Base":
		{
			"Capabilities-Exchange": 
			{
				"module":"./baseHandler",
				"functionName": "cerHandler"
			},
			"Device-Watchdog":
			{
				"module":"./baseHandler",
				"functionName": "watchdogHandler"			
			},
			"Disconnect-Peer":
			{
				"module":"./baseHandler",
				"functionName": "disconnectPeerHandler"			
			}
		},
		"Credit-Control":
		{
			"Credit-Control":
			{
				"module":"./policyScripts/gyHandler",
				"functionName": "ccrHandler"
			}
		},
        "Gx":
        {
            "Credit-Control":
            {
                "module":"./policyScripts/gxHandler",
                "functionName": "ccrHandler"
            }
        },
        "Radius":
        {
            "Access-Request":
            {
                "module":"./policyScripts/radiusHandler-TASA",
                "functionName": "accessRequestHandler"
            },
            "Accounting-Request":
            {
                "module":"./policyScripts/radiusHandler-TASA",
                "functionName": "accountingRequestHandler"
            }
        }
	}
};

db.dispatcher.insert(dispatcher);
print("done");
print("");

print("----------------------------------");
print("Creating Dictionary configuration");
print("----------------------------------");

db.diameterDictionary.drop();

var diameterDictionary=
{
	"_version": 1001,
	"vendor":
	{
			"1001": "francisco.cardosogil@gmail.com",
			"9": "Cisco",
            "10415": "3GPP"
	},

	"avp":
	{
		"0":
		[
			{
				"code": 1,
				"name": "User-Name",
				"type": "UTF8String"
			},
            {
                "code": 8,
                "name": "Framed-IP-Address",
                "type": "IPv4Address"
            },
            {
                "code": 97,
                "name": "Framed-IPv6-Prefix",
                "type": "IPv6Prefix"
            },
            {
                "code": 168,
                "name": "Framed-IPv6-Address",
                "type": "IPv6Address"
            },
			{
				"code": 257,
				"name": "Host-IP-Address",
				"type": "Address"
			},
			{
				"code": 258,
				"name": "Auth-Application-Id",
				"type": "Enumerated",
				"enumValues":
				{
					"Base": 0,
					"NASREQ": 1,
					"Mobile-IPv4": 2,
					"Accounting": 3,
					"Credit-Control": 4,
                    "Gx": 16777238
				}
			},
			{
				"code": 259,
				"name": "Acct-Application-Id",
				"type": "Enumerated",
				"enumValues":
				{
					"Base": 0,
					"NASREQ": 1,
					"Mobile-IPv4": 2,
					"Accounting": 3,
					"Credit-Control": 4,
                    "Gx": 16777238
				}
			},
			{
				"code": 263,
				"name": "Session-Id",
				"type": "UTF8String"
			},
			{
				"code": 264,
				"name": "Origin-Host",
				"type": "DiamIdent"
			},
			{
				"code": 266,
				"name": "Vendor-Id",
				"type": "Unsigned32"
			},
			{
				"code": 267,
				"name": "Firmware-Revision",
				"type": "Unsigned32"
			},
			{
				"code": 268,
				"name": "Result-Code",
				"type": "Unsigned32"
			},
			{
				"code": 269,
				"name": "Product-Name",
				"type": "UTF8String"
			},
			{
				"code": 273,
				"name": "Disconnect-Cause",
				"type": "Enumerated",
				"enumValues":
				{
					"Rebooting": 0,
					"Busy": 1,
					"DoNotWantToTalkToYou": 2
				}
			},
			{
				"code": 283,
				"name": "Destination-Realm",
				"type": "DiamIdent"
			},
			{
				"code": 278,
				"name": "Origin-State-Id",
				"type": "Unsigned32"
			},
            {
                "code": 281,
                "name": "Error-Message",
                "type": "UTF8String"
            },
			{
				"code": 293,
				"name": "Destination-Host",
				"type": "DiamIdent"
			},
			{
				"code": 296,
				"name": "Origin-Realm",
				"type": "DiamIdent"
			},
			{
				"code": 299,
				"name": "Inband-Security-Id",
				"type": "Enumerated",
				"enumValues":
				{
					"NoInbandSecurity": 0,
					"TLS": 1
				}				
			},
            {
                "code": 415,
                "name": "CC-Request-Number",
                "type": "Unsigned32"
            },
            {
                "code": 416,
                "name": "CC-Request-Type",
                "type": "Enumerated",
                "enumValues":
                {
                    "Initial": 1,
                    "Update": 2,
                    "Termination": 3,
                    "Event": 4
                }
            },
            {
                "code": 443,
                "name": "Subscription-Id",
                "type": "Grouped",
                "group":
                {
                    "Subscription-Id-Type": {"minOccurs": 1, "maxOccurs": 1},
                    "Subscription-Id-Data": {"minOccurs": 1, "maxOccurs": 1}
                }
            },
            {
                "code": 444,
                "name": "Subsription-Id-Data",
                "type": "UTF8String"
            },
            {
                "code": 450,
                "name": "Subscription-Id-Type",
                "type": "Enumerated",
                "enumValues":
                {
                    "EndUserE164": 0,
                    "EndUserIMSI": 1,
                    "EndUserSIPURI": 2,
                    "EndUserNAI": 3,
                    "EndUserPrivate": 4
                }
            }
		],

        "10415":
        [
            {
                "code": 515,
                "name": "Max-Requested-Bandwidth-UL",
                "type": "Unsigned32"
            },
            {
                "code": 516,
                "name": "Max-Requested-Bandwidth-DL",
                "type": "Unsigned32"
            },
            {
                "code": 1016,
                "name": "QoS-Information",
                "type": "Grouped",
                "group":
                {
                    "QoS-Class-Identifier":{"minOccurs": 1, "maxOccurs": 1},
                    "Max-Requested-Bandwidth-UL":{"minOccurs": 1, "maxOccurs": 1},
                    "Requested-Bandwidth-DL":{"minOccurs": 1, "maxOccurs": 1},
                    "Guaranteed-Bitrate-UL":{"minOccurs": 1, "maxOccurs": 1},
                    "Guaranteed-Bitrate-DL":{"minOccurs": 1, "maxOccurs": 1},
                    "Bearer-Identifier":{"minOccurs": 1, "maxOccurs": 1},
                    "Allocation-Retention-Priority":{"minOccurs": 1, "maxOccurs": 1},
                    "APN-Aggregate-Max-Bitrate-UL":{"minOccurs": 1, "maxOccurs": 1},
                    "APN-Aggregate-Max-Bitrate-DL":{"minOccurs": 1, "maxOccurs": 1}
                }
            },
            {
                "code": 1020,
                "name": "Bearer-Identifier",
                "type": "OctetString"
            },
            {
                "code": 1025,
                "name": "Guaranteed-Bitrate-DL",
                "type": "Unsigned-32"
            },
            {
                "code": 1026,
                "name": "Guaranteed-Bitrate-UL",
                "type": "Unsigned-32"
            },
            {
                "code": 1027,
                "name": "IP-CAN-Type",
                "type": "Enumerated",
                "enumValues":
                {
                    "3GPP-GPRS": 0,
                    "DOCSIS": 1,
                    "xDSL": 2,
                    "WiMAX": 3,
                    "3GPP2": 4,
                    "3GPP-EPS": 5,
                    "Non-3GPP-EPS": 6
                }
            },
            {
                "code": 1028,
                "name": "QoS-Class-Identifier",
                "type": "Enumerated",
                "enumValues":
                {
                    "CLASS0": 0,
                    "CLASS1": 1,
                    "CLASS2": 2,
                    "CLASS3": 3,
                    "CLASS4": 4,
                    "CLASS5": 5,
                    "CLASS6": 6,
                    "CLASS7": 7,
                    "CLASS8": 8,
                    "CLASS9": 9
                }
            },
            {
                "code": 1027,
                "name": "3G-RAT-Type",
                "type": "Enumerated",
                "enumValues": {
                    "WLAN": 0,
                    "VIRTUAL": 1,
                    "UTRAN": 1000,
                    "GERAN": 1001,
                    "GAN": 1002,
                    "HSPA_EVOLUTION": 1003,
                    "EUTRAN": 1004,
                    "CDMA2000_1X": 2000,
                    "HRPD": 2001,
                    "UMB": 2002,
                    "EHRPD": 2003
                }
            },
            {
                "code": 1032,
                "name": "RAT-Type",
                "type": "Enumerated",
                "enumValues": {
                    "UTRAN": 1,
                    "GERAN": 2,
                    "WLAN": 3,
                    "GAN": 4,
                    "HSPA-Evolution": 5,
                    "EUTRAN": 6,
                    "Virtual": 7,
                    "IEEE-802-16e": 101,
                    "3GPP2-eHRPD": 102,
                    "3GPP2-HRPD": 103,
                    "3GPP2-1xRTT": 104,
                    "3GPP2-UMB": 105
                }
            },
            {
                "code": 1034,
                "name": "Allocation-Retention-Priority",
                "type": "Grouped",
                "group":
                {
                    "Priority-Level":{"minOccurs": 1, "maxOccurs": 1},
                    "Pre-emption-Capability":{"maxOccurs": 1},
                    "Pre-emption-Vulnerability":{"maxOccurs": 1}
                }
            },
            {
                "code": 1040,
                "name": "APN-Aggregate-Max-Bitrate-DL",
                "type": "Unsigned32"
            },
            {
                "code": 1041,
                "name": "APN-Aggregate-Max-Bitrate-UL",
                "type": "Unsigned32"
            },
            {
                "code": 1046,
                "name": "Priority-Level",
                "type": "Unsigned32"
            },
            {
                "code": 1047,
                "name": "Pre-emption-Capability",
                "type": "Enumerated",
                "enumValues":
                {
                    "enabled": 0,
                    "disabled": 1
                }
            },
            {
                "code": 1048,
                "name": "Pre-emption-Vulnerability",
                "type": "Enumerated",
                "enumValues":
                {
                    "enabled": 0,
                    "disabled": 1
                }
            }
        ],
		"1001":
		[
			{
				"code": 1,
				"name": "myparameter",
				"type": "UTF8String"
			}
		],

		"9":
		[
			{
				"code": 1,
				"name": "bigparameter",
				"type": "UTF8String"
			}
		]

	},

	"applications":
	[
		{
			"name":"Base",
			"code": 0,
			"commands":
			[
				{
					"code": 257,
					"name": "Capabilities-Exchange",
					"request":
					{
						"Origin-Host": {"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Host-IP-Address": {"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Vendor-Id":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Product-Name":{"minOccurs": 1, "maxOccurs": 1},
						"Origin-State-Id":{"maxOccurs": 1},
						"Supported-Vendor-Id":{},
						"Auth-Application-Id":{"mandatory": true},
						"Inband-Security-Id":{},
						"Acct-Application-Id":{"mandatory": true},
						"Vendor-Specific-Application-Id":{},
						"Firmware-Revision":{"maxOccurs": 1},
						"AVP":{}
					},
					"response":
					{	
						"Result-Code":{"minOccurs": 1, "maxOccurs": 1},
						"Origin-Host":{"minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"minOccurs": 1, "maxOccurs": 1},
						"Host-IP-Address": {"minOccurs": 1, "maxOccurs": 1},
						"Vendor-Id":{"minOccurs": 1, "maxOccurs": 1},
						"Product-Name":{"minOccurs": 1, "maxOccurs": 1},
						"Origin-State-Id":{"maxOccurs": 1},
						"Error-Message":{"maxOccurs": 1},
						"Failed-AVP":{},
						"Supported-Vendor-Id":{},
						"Auth-Application-Id":{},
						"Inband-Security-Id":{},
						"Acct-Application-Id":{},
						"Vendor-Specific-Auth-Application-Id":{},
						"Firmware-Revision":{"maxOccurs": 1},
						"AVP":{}
					}
				},
				{
					"code": 280,
					"name": "Device-Watchdog",
					"request":
					{
						"Origin-Host": {"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Origin-State-Id":{"maxOccurs": 1}
					},
					"response":
					{
						"Origin-Host": {"minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"minOccurs": 1, "maxOccurs": 1},
                        "Result-Code":{"maxOccurs": 1},
						"Error-Message":{"maxOccurs": 1},		
						"Failed-AVP":{},
						"Origin-State-Id":{"maxOccurs": 1}
					}
				},
				{
					"code": 282,
					"name": "Disconnect-Peer",
					"request":
					{
						"Origin-Host": {"minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"minOccurs": 1, "maxOccurs": 1},
						"Disconnect-Cause":{"maxOccurs": 1}
					},
					"response":
					{
						"Result-Code":{"minOccurs": 1, "maxOccurs": 1},
						"Origin-Host": {"minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"minOccurs": 1, "maxOccurs": 1},	
						"Error-Message":{"maxOccurs": 1},		
						"Failed-AVP":{}
					}
				}
			]
		},
		{
			"name":"Accounting",
			"code": 3,
			"type": "acct",
			"commands":
			[
				{
					"code": 271,
					"name": "Accounting",
					"request":
					{
						"Session-Id":{"minOccurs": 1, "maxOccurs": 1},
						"Origin-Host": {"minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"minOccurs": 1, "maxOccurs": 1},
						"Destination-Realm":{"minOccurs": 1, "maxOccurs": 1},
						"Accounting-Record-Type":{"minOccurs": 1, "maxOccurs": 1},
						"Accounting-Record-Number":{"minOccurs": 1, "maxOccurs": 1},
						"Acct-Application-Id":{"maxOccurs": 1},
						"Vendor-Specific-Application-Id":{"maxOccurs": 1},
						"User-Name":{"maxOccurs": 1},
						"Accounting-Sub-Session-Id":{"maxOccurs": 1},
						"Acct-Session-Id":{"maxOccurs": 1},
						"Acct-Multi-Session-Id":{"maxOccurs": 1},
						"Acct-Interim-Interval":{"maxOccurs": 1},
						"Accounting-Realtime-Required":{"maxOccurs": 1},
						"Origin-State-Id":{"maxOccurs": 1},
						"Event-Timestamp":{"maxOccurs": 1},
						"Proxy-Info":{},
						"Route-Record":{},
						"AVP":{}
					},
					"response":
					{
						"Session-Id":{"minOccurs": 1, "maxOccurs": 1},
						"Result-Code":{"minOccurs": 1, "maxOccurs": 1},
						"Origin-Host":{"minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"minOccurs": 1, "maxOccurs": 1},
						"Accounting-Record-Type":{"minOccurs": 1, "maxOccurs": 1},
						"Accounting-Record-Number":{"minOccurs": 1, "maxOccurs": 1},
						"Acct-Application-Id":{"maxOccurs": 1},
						"Vendor-Specific-Application-Id":{"maxOccurs": 1},
						"User-Name":{"maxOccurs": 1},
						"Accounting-Sub-Session-Id":{"maxOccurs": 1},
						"Acct-Session-Id":{"maxOccurs": 1},
						"Acct-Multi-Session-Id":{"maxOccurs": 1},
						"Error-Reporting-Host":{"maxOccurs": 1},
						"Acct-Interim-Interval":{"maxOccurs": 1},
						"Accounting-Realtime-Required":{"maxOccurs": 1},
						"Origin-State-Id":{"maxOccurs": 1},
						"Event-Timestamp":{"maxOccurs": 1},
						"Proxy-Info":{},
						"AVP":{}
					}
				}
			]
		},
		{
			"name":"Credit-Control",
			"code": 4,
			"type": "auth",
			"commands":
			[
				{
					"code": 272,
					"name": "Credit-Control",
					"request":
					{
						"Session-Id":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Origin-Host": {"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Origin-Realm":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Destination-Realm":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                        "Destination-Host":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"Auth-Application-Id":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"CC-Request-Type":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
						"CC-Request-Number":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                        "Origin-State-Id":{},
                        "Subscription-Id":{},
                        "IP-CAN-Type":{},
                        "3G-RAT-Type":{},
                        "RAT-Type":{},
						"AVP":{}
					},
                    "response":
                    {
                        "Session-Id":{"minOccurs": 1, "maxOccurs": 1},
                        "Result-Code":{"minOccurs": 1, "maxOccurs": 1},
                        "Origin-Host":{"minOccurs": 1, "maxOccurs": 1},
                        "Origin-Realm":{"minOccurs": 1, "maxOccurs": 1},
                        "Auth-Application-Id":{"minOccurs": 1, "maxOccurs": 1},
                        "CC-Request-Type":{"minOccurs": 1, "maxOccurs": 1},
                        "CC-Request-Number":{"minOccurs": 1, "maxOccurs": 1},
                        "AVP":{}
                        }
				}
			]
		},
        {
            "name":"Gx",
            "code": 16777238,
            "type": "auth",
            "commands":
                [
                    {
                        "code": 272,
                        "name": "Credit-Control",
                        "request":
                        {
                            "Session-Id":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                            "Origin-Host": {"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                            "Origin-Realm":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                            "Destination-Realm":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                            "Destination-Host":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                            "Auth-Application-Id":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                            "CC-Request-Type":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                            "CC-Request-Number":{"mandatory": true, "minOccurs": 1, "maxOccurs": 1},
                            "Origin-State-Id":{},
                            "Subscription-Id":{},
                            "Bearer-Identifier":{},
                            "Framed-IP-Address":{},
                            "Framed-IPv6-Prefix":{},
                            "AVP":{}
                        },
                        "response":
                        {
                            "Session-Id":{"minOccurs": 1, "maxOccurs": 1},
                            "Result-Code":{"minOccurs": 1, "maxOccurs": 1},
                            "Origin-Host":{"minOccurs": 1, "maxOccurs": 1},
                            "Origin-Realm":{"minOccurs": 1, "maxOccurs": 1},
                            "Auth-Application-Id":{"minOccurs": 1, "maxOccurs": 1},
                            "CC-Request-Type":{"minOccurs": 1, "maxOccurs": 1},
                            "CC-Request-Number":{"minOccurs": 1, "maxOccurs": 1},
                            "AVP":{}
                        }
                    }
                ]
        }
	]
};

db.diameterDictionary.insert(diameterDictionary);
print("done");
print("");

print("----------------------------------");
print("Creating CDR Channels configuration");
print("----------------------------------");
db.cdrChannels.drop();

var localFileChannel={
    "type": "file",
    "location": "/var/lever/policyServer/cdr/cdr_",
    "extension": ".txt",
    "rolling": "minute",
    "format": "livingstone",
    "enabled": true
};

var dbChannel={
    "type": "database",
    "location": "mongodb://cdrdb.lever/cdr",
    "collection": "cdr",
    "filter": ["User-Name", "NAS-IP-Address", "NAS-Port"],
    "enabled": true
};

db.cdrChannels.insert(localFileChannel);
db.cdrChannels.insert(dbChannel);

print("done");
print("");

print("----------------------------------");
print("Creating Policy configuration");
print("----------------------------------");


db.policyParams.drop();

// APN and Target

var apn_internet_unifon={
    setName:"apn",
    key: "internet.unifon",
    values: {
        targets:["psa", "spb", "wap-gw"]
    }
};

var apn_empresas={
    setName:"apn",
    key: "empresas",
    values: {
        targets:["psa", "spb", "rcs"]
    }
};

var target_psa={
    setName:"targets",
    key: "psa",
    values: {
        ipAddresses: ["192.168.1.101", "192.168.1.102"],
        timeoutMs: 750,
        retries: 2
    }
};

var target_spb={
    setName:"targets",
    key: "spb",
    values: {
        ipAddresses: ["192.168.1.101", "192.168.1.102"],
        timeoutMs: 750,
        retries: 2
    }
};

var target_rcs={
    setName:"targets",
    key: "rcs",
    values: {
        ipAddresses: ["192.168.1.101"],
        timeoutMs: 1500,
        retries: 1
    }
};

db.policyParams.insert(apn_internet_unifon);
db.policyParams.insert(apn_empresas);
db.policyParams.insert(target_psa);
db.policyParams.insert(target_spb);
db.policyParams.insert(target_rcs);

// DomainConfig
var domain_speedy={
    setName: "domain",
    key: "speedy",
    values:{
        provisionType: "database",
        doProxyAuth: true,
        doProxyServiceAcct: true,
        radiusProxyGroup: "speedy",
        avps:{
            "Unisphere-Virtual-Router": "wbc2"
        }
    }
};

var domain_arnet={
    setName: "domain",
    key: "arnet",
    values:{
        provisionType: "none",
        doProxyAuth: true,
        doProxyServiceAcct: true,
        radiusProxyGroup: "arnet",
        avps:{
            "Unisphere-Virtual-Router": "arnet"
        }
    }
};

db.policyParams.insert(domain_speedy);
db.policyParams.insert(domain_arnet);

// ServiceConfig
var service_permissive={
    setName: "service",
    key: "permissive",
    values:{
        avps:{
            "Reply-Message": "Permissive service"
        }
    }
};

var service_sd3M={
    setName: "service",
    key: "sd3M",
    values:{
        avps:{
            "Reply-Message": "sd3M"
        }
    }
};

db.policyParams.insert(service_permissive);
db.policyParams.insert(service_sd3M);

var global_params={
    setName: "global",
    key: "global",
    values:{
        serviceOnSubscriptionNotFound: "permissive"
    }
};

db.policyParams.insert(global_params);
