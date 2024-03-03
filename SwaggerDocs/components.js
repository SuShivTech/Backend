/**
 * @swagger
 * components:
 *  
 *  schemas:
 *    Blog:
 *      type: object
 *      required:
 *       
 *        - title
 *        - description
 *        
 *      properties:
 *          title:  
 *             type: string
 *             description: Blog title
 *          description:
 *              type: string
 *              description: Blog description
 *         
 *      example:
 *         
 *         
 *          title:  Test blog update test  1
 *          description: Test blog description update test 1          
 *         
*/      

/**
 * @swagger
 * components:
 *  
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        
 *        - name
 *        - email
 *        - phone
 *        - password
 *      properties:
 *          name:  
 *             type: string
 *             description: user title
 *          email:
 *              type: string
 *              description: user email unique
 *          password:
 *              type: string
 *              description: user password becrypted
 *          
 *      example:
 *          
 *          name:  Test User1
 *          email: Test@gmail.com
 *          phone: 9227462129
 *          password: demopassword          
 *          createdAt: 2023-12-22T17:11:41.888Z
 *          updatedAt: 2023-12-22T17:13:13.339Z
 *    UserLogin:
 *      type: object
 *      required:
 *        
 *       
 *        - email
 *        - password
 *      properties:
 *          
 *          email:
 *              type: string
 *              description: user email unique
 *          password:
 *              type: string
 *              description: user password becrypted
 *          
 *      example:
 *          
 * 
 *          email: Test@gmail.com
 *      
 *          password: password          
 *   
 *    UserTokenDeleted:
 *      type: object
 *      required:
 *        -message
 *      properties:
 *          message:
 *              type: string
 *              description: user email unique
 *      example:
 *          message:Token deleted
 *       
*/ 

/**
 *  @swagger
 * components:
 *    securitySchemes:
 *      cookieAuth:          
 *         type: apikey
 *         in: cookie
 *         name: jwtoken   
 * security:
 *    - cookieAuth: []   
 */
