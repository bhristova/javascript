const jwt = require('jsonwebtoken');

const config = require('../config');
const query = require('../db/query');
const queryFactory = require('../db/queryFactory');

userController = () => {
    const tableName = 'User';
    const queriesInstance = query();
    const queryFactoryInstance = queryFactory(tableName);

    return {
        getAll: async (req, res) => {
            try {
                const options = {
                    select: [{
                        what: '*'
                    }],
                    tableName: tableName,
                    ordering: 'asc',
                    orderBy: 'name'
                };

                const query = queryFactoryInstance.queryGetAll(options);

                const result = await queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            };
        },
        login: async (req, res) => {
            try {
                const optionsExistingUser = {
					select: [{
						what: '*',
					}],
                    tableName: 'User',
					filter: [
						{
							column: 'email',
							op: '=',
							value: `'${req.body.email}'`
						}, {
							column: 'password',
							op: '=',
							value: `'${req.body.password}'` ///TODO: hash password
						}
					]
                };
                const queryGetExisting = queryFactoryInstance.queryGetAll(optionsExistingUser)
                const existing = await queriesInstance.executeQuery(queryGetExisting);

                if(existing.length === 0) {
                    return res.status(409).send({message: 'Wrong email or password'});
                }
                
                const user = existing[0];
                const accessToken = jwt.sign({ username: user.username, id: user.id}, config.auth.accessTokenSecret);

                res.status(200).send({ message: 'OK', token: accessToken });
            } catch (err) {
                res.status(500).send(err);
            }
        },
        getById: async (req, res) => {
            try {
                const query = queryFactoryInstance.queryGetById(req);
                const result = queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            };
        },
        create: async (req, res) => {

            try {
                const optionsExistingUser = {
					select: [{
						what: '1',
					}],
                    tableName: 'User',
					filter: [
						{
							column: 'email',
							op: '=',
							value: `'${req.body.email}'`
						}
					]
                };
                const queryGetExisting = queryFactoryInstance.queryGetAll(optionsExistingUser)
                const existing = await queriesInstance.executeQuery(queryGetExisting);

                if(existing.length > 0) {
                    return res.status(409).send({message: 'User with the same email exists!'});
                }
                
                const query = queryFactoryInstance.queryCreate(req.body);
                const create = await queriesInstance.executeQuery(query);

                res.status(200).send({ message: 'OK' });
            } catch (err) {
                res.status(500).send(err);
            }
        },
        update: async (req, res) => {
            try {
                const query = queryFactoryInstance.queryUpdate(req);
                const result = await queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            };
        },
        delete: async (req, res) => {
            try {
                const query = queryFactoryInstance.queryDelete(req);
                const result = await queriesInstance.executeQuery(query);
                res.status(200).send(result);
            } catch (err) {
                res.status(500).send(err);
            };
        },
    }
}

module.exports = userController;