#!/bin/bash
clear
           scanning="session"
   if [ -d "$scanning" ]; then
         read -p "Anda Ingin Login Ke Nomor Baru Bot Atau Tidak ? Jawab ( ya/no ) : " gimana
          if [[ "$gimana" = "no" || "$gimana" = "n" ]]; then
             clear
             elif [[ "$gimana" = "ya" || "$gimana" = "y" ]]; then
             rm -rf $scanning
             clear
             echo "Succes Bot Bisa Di Loginkan Ke Nomor Yang Baru !"
             sleep 5
             clear
          fi
  fi
    while true; do
          file="node_modules"
        if [ -d "$file" ]; then
           while true; do
                   clear
                   play -q $HOME/TOOLSV5/sound/robot2.mp3 &>/dev/null
                   echo "BOT DI JALANKAN 24 JAM UNTUK BERHENTI CTRL+C "
                   echo "TUNGGU 10 DETIK "
                   sleep 10
                   play -q $HOME/TOOLSV5/sound/klik.mp3 &>/dev/null
                   npm start
            done
       else
                    clear
                    play -q $HOME/TOOLSV5/sound/salah.mp3 &>/dev/null
                    echo "Node_Modules Belum Terinstall"
                    sleep 5
                    clear
                    echo "Menginstall Node_Modules"
                    echo
                    sleep 3
                    pkg update && pkg upgrade
                    pkg install bash -y
                    pkg install libwebp -y
                    pkg install git -y
                    pkg install nodejs -y 
                    pkg install ffmpeg -y 
                    pkg install wget
                    pkg install imagemagick -y
                    pkg install yarn
                    yarn
        fi
     done
