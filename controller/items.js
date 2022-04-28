const axios = require("axios")

const getItems = async (req, res) => {
    try {

        let q = req.query.q;
        console.log("query", q);
        const result = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`);
        const datoNuevo = formatterData(result.data.results);

        return res.status(200).json(
            datoNuevo
        ).end();
    } catch (error) {
        console.log("Erorrsito", error);
    }
};

const formatterData = (data) => {
    const nuevoObjeto = {};
    let array = {
        author: {
            name: "Lucas",
            lastname: "Wisgikl",
        },
        categories: ["Categoria1", "Categoria 2", "Categoria 3"],
        items: []
    }



    for (let index = 0; index < data.length; index++) {
        //console.log("asd",data);
        const element = data[index];
        nuevoObjeto.items = {
            id: element.id,
            title: element.title,
            price: {
                currency: element.prices.prices[0].currency_id,
                amount: element.prices.prices[0].amount,
                decimals: 0
            },
            picture: element.thumbnail,
            condition: element.condition,
            free_shipping: element.shipping.free_shipping

        };
        array.items.push(nuevoObjeto.items)

    }
    console.log("Arreglo", array);
    return array;
}


const getItemInfo = async (req, res) => {
    try {
        let item = req.params.id;

        //https://api.mercadolibre.com/items/MLA1127156356
        const result = await axios.get(`https://api.mercadolibre.com/items/${item}`);
        const resultDescription = await axios.get(`https://api.mercadolibre.com/items/${item}/description`);

        //console.log("asd", result.data);
        const datoNuevo = formatterDataInfo(result.data, resultDescription.data);

        return res.status(200).json(
            datoNuevo
        ).end();
    } catch (error) {
        console.log(error);
    }
}

const formatterDataInfo = (data, resultDescription) => {
    
    let array = {
        author: {
            name: "Lucas",
            lastname: "Wisgikl",
        },
        items: {}
    }
    array.item= {
        id: data.id,
        title: data.title,
        price: {
            currency: data.currency_id,
            amount: data.price,
            decimals: 0,
        },
        picture: data.pictures[0].url,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: resultDescription.plain_text

    };

    return array;
}
module.exports = {
    getItems,
    getItemInfo
}