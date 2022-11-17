const router    = require('express').Router();
const { findByIdAndDelete } = require('../models/Item');
const Item      = require('../models/Item')
/**
 * @openapi
 *   tags:
 *     name: Items
 *     description: Managing items
 */
/**
 * @openapi
 *  /api/v0/items:
 *    get:
 *      summary: Get all items
 *      description: This GETs all items and stores them in an array
 *      tags: [Items]
 *      responses:
 *        200:
 *          description: Successfully got items, stored in array
 *        500: 
 *          description: Server is not running
 */
router.get('/', async (req, res) => {
    try {        
        let items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json(error)
    }
})
/**
 * @openapi
 *  /api/v0/items:
 *   post:
 *     summary: Create a new item
 *     description: This POST creates a new item. You need to send a request body. An example can be found below
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _type:
 *                 type: string
 *                 required: true
 *                 description: The item type. Use only low cases.
 *                 example: jeans
 *               category:
 *                 type: array
 *                 description: The category(ies) it fits too.
 *                 example: [clothing, bottoms]
 *               img:
 *                 type: string
 *                 description: File-path to img
 *                 example: ...
 *               name:
 *                 type: string
 *                 description: Name of the item.
 *                 example: Bella jeans
 *               desc:
 *                 type: string
 *                 description: Item description.
 *                 example: Blue, high-waisted jeans in a mom style
 *               color:
 *                 type: array
 *                 description: Colors of the item.
 *                 example: [blue]
 *               price:
 *                 type: number
 *                 description: Price of the item.
 *                 example: 39.95
 *               quantity:
 *                 type: number
 *                 description: Quantity in store.
 *                 example: 19
 *               airedAt: 
 *                 type: Date
 *                 description: Release date
 *                 example: Date.now()
 *     responses:
 *       200:
 *         description: Created an item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _type:
 *                       type: string
 *                       description: The item type. Use only low cases.
 *                       example: jeans
 *                     category:
 *                       type: array
 *                       description: The category(ies) it fits too.
 *                       example: [clothing, bottoms]
 *                     img:
 *                       type: string
 *                       description: File-path to img
 *                       example: ...
 *                     name:
 *                       type: string
 *                       description: Name of the item.
 *                       example: Bella jeans
 *                     desc:
 *                       type: string
 *                       description: Item description.
 *                       example: Blue, high-waisted jeans in a mom style
 *                     color:
 *                       type: array
 *                       description: Colors of the item.
 *                       example: [blue]
 *                     price:
 *                       type: number
 *                       description: Price of the item.
 *                       example: 39.95
 *                     quantity:
 *                       type: number
 *                       description: Quantity in store.
 *                       example: 19
 *                     airedAt: 
 *                       type: Date
 *                       description: Release date
 *                       example: Date.now()
 *                     _id: 
 *                       type: ObjectId
 *                       description: Random string
 *                       example: 6375fc17ae5442b31cf94ede
 *                     __v: 
 *                       type: string
 *                       description: Version
 *                       example: 0
 *       409:
 *         description: Item with that name already exist. Give it a new name.
 *       500:
 *         description: Is server up and running?
 */
router.post('/', async (req, res) => {
   try{
    const doesItemNameExist = await Item.findOne({name: req.body.name})
    if(!doesItemNameExist){
        let item = new Item(req.body)
        await item.save()
        res.status(200).send(item)
    }else{
        res.status(409).send('Item with that name already exists')
    }
   }catch(err){
    res.status(500).send(err)
   }
    
})

/**
 * @openapi
 *  /api/v0/items/{id}:
 *    get:
 *      summary: Get a specific item
 *      description: This GETs a specific item by finding it with the id
 *      tags: [Items]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The item id
 *          example: 6375fc17ae5442b31cf94ede
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully got item
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: integer
 *                        description: The item ID.
 *                        example: 6375fc17ae5442b31cf94ede
 *                      category:
 *                        type: array
 *                        description: Categories.
 *                        example: [accessories, hats]
 *                      img:
 *                        type: string
 *                        description: Img path name.
 *                        example: img path name
 *                      name:
 *                        type: string
 *                        description: Item name.
 *                        example: Pelle beanie
 *                      desc:
 *                        type: string
 *                        description: Item description.
 *                        example: Black skater-style beanie
 *                      color:
 *                        type: arrray
 *                        description: It's colors
 *                        example: [black]
 *                      price:
 *                        type: number
 *                        description: It's price
 *                        example: 17.95
 *                      quantity:
 *                        type: number
 *                        description: It's quantity
 *                        example: 8
 *                      airedAt:
 *                        type: date
 *                        description: It's release date
 *                        example: "2022-11-17T09:17:11.346Z"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Is server up and running?
 */
router.get('/:id', async (req, res) => {
    try{
        try {
            const item = await Item.findById(req.params.id)
            res.status(200).send(item)
        } catch (error) {
            res.status(404).send('Item not found')
            
        }
    }catch(err){
        res.status(500).json(err)
    }
})
/**
 * @openapi
 *  /api/v0/items/{id}:
 *    delete:
 *      summary: Deletes a specific item
 *      description: This deletes a specific item by finding it with the id
 *      tags: [Items]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The item id
 *          example: 631aea6027af069a690702bc
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully deleted item
 *        404:
 *          description: Item not found
 *        500:
 *          description: Is server up and running?
 */
router.delete('/:id', async (req, res) => {
    try{
        const doesItemExist = await Item.findById(req.params.id)
        if(!doesItemExist){
            res.status(404).send('Item not found!')
        }else{
            await Item.findByIdAndDelete(req.params.id)
            res.status(200).send('Item has been deleted...')
        }
    }catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router;