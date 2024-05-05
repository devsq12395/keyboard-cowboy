

bake (){
    echo "----------------------------------------------"
    echo "Baking..."

    cd tools
    chmod +x bake.sh
    bash bake.sh
    cd ..

    echo "Done!"
    echo "----------------------------------------------"
}

secure (){
    echo "----------------------------------------------"
    echo "Obfuscating..."

    javascript-obfuscator 'game.min.js' -o 'game.min.js' --config 'tools/javascript-obfuscator-dev.json'
    sed -i.bak 's/{data;}else{return;}/{}else{return;}/g' game.min.js
    rm *.bak

    echo "Done!"
    echo "----------------------------------------------"
}

compress (){
    if [ ! -f ../build.zip ]; 
        then
            echo "File not found!"
        else
            echo "File exist. Removing"
            rm ../build.zip
    fi

    zip -r ./build.zip ./index.html ./game.min.js ./game.css ./media
}

bake
secure
compress