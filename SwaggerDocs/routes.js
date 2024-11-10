
/**
 * @swagger
 * /api/user/register:
 *    post:
 *      summary: User Registeration
 *      tags: [User]
 *      
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'      
 *      responses:
 *        200:
 *          description: User Registered
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */


/**
 * @swagger
 * /api/user/login:
 *    post:
 *      summary: User Login
 *      tags: [User]
 *      
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/UserLogin'   
 *      security: []                  
 *      responses:
 *        200:
 *          description: User Logged in
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  item:
 *                      message: string
 *                      jwtoken: string
 * 
 */


/**
 * @swagger
 * /api/user/updateprofile:
 *    put:
 *      summary: User Update Profile
 *      tags: [User]
 *      security:
 *        - cookieAuth: []
 *      
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'   
 *                     
 *      responses:
 *        200:
 *          description: User Logged in
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  item:
 *                     $ref: '#/components/schemas/User'
 */


/**
 * @swagger
 * /api/user/logout:
 *    get:
 *      summary: User logout
 *      tags: [User]
 *      security:
 *        - cookieAuth: []
 *               
 *      responses:
 *        200:
 *          description: User Logged in
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/UserTokenDeleted'
 */



/**
 * @swagger
 * /api/user/getuser:   
 *    get:
 *      summary:  To get the profile fo current logged in user
 *      tags: [User]
 *      security:
 *        - cookieAuth: []           
 *      responses:
 *        200:
 *          description: User  object
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/User'
 */


/**
 * @swagger
 * /api/blog:
 *    get:
 *      summary: Returns all the blogs
 *      responses:
 *        200:
 *          description: blog lists
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */

/**
 * @swagger
 * /api/blog/{id}:
 *    get:
 *      security:
 *        - cookieAuth: []
 *      summary: Returns Blog  provide blog id. Pest the _id provided by MongoDB present in blog documen 
 *      tags: [Blog]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *              required: true
 *              description: 
 *      responses:
 *        200:
 *          description: blog lists
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */


/**
 * @swagger
 * /api/blog:
 *    post:
 *      security:
 *        - cookieAuth: []
 *      summary: Create Blog 
 *      tags: [Blog]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Blog'   
 *      responses:
 *        200:
 *          description: blog 
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */


/**
 * @swagger
 * /api/blog/{id}:
 *    put:
 *      security:
 *        - cookieAuth: []
 *      summary: Update Blog by id.  Pest the _id provided by MongoDB present in blog documen 
 *      tags: [Blog]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *              required: true
 *              description: the blog id
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Blog'   
 *      responses:
 *        200:
 *          description: blog 
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */


/**
 * @swagger
 * /api/blog/{id}:
 *    delete:
 *      security:
 *        - cookieAuth: []
 *      summary: Delete Blog by id.  Pest the _id provided by MongoDB present in blog documen 
 *      tags: [Blog]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *              required: true
 *              description: the blog id
 *      responses:
 *        200:
 *          description: blog 
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */


/**
 * @swagger
 * /api/blog/users:
 *    get:
 *      security:
 *        - cookieAuth: []
 *      summary: Get All blogs of logged in user
 *      tags: [Blog]
 *      responses:
 *        200:
 *          description: blog 
 *          content:
 *            application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Blog'
 */
//https://aditya17003blog.azurewebsites.net/api-docs