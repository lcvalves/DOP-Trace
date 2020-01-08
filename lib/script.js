/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.doptrace.setupDemo} setupDemo The sample transaction instance.
 * @transaction
 */

function setupDemo(setupDemo) {

    var factory = getFactory();
    var NS = 'org.doptrace';

    /**
     * PARTICIPANTS
     */

    // criar SysAdmin (luisalves é username [sysadmin id])
    var sysAdmin = factory.newResource(NS, 'SysAdmin', 'luisalves');
    var sysAdminContacts = factory.newConcept(NS, 'Contacts');
    sysAdminContacts.phoneNumber = "911111111";
    sysAdminContacts.email = "admin@email.com";
    sysAdmin.contacts = sysAdminContacts;
    sysAdmin.firstname = "Luis";
    sysAdmin.lastname = "Alves";
    sysAdmin.password = "123";

    // criar WorkerAdmin
    var workerAdmin = factory.newResource(NS, 'WorkerAdmin', 'tiagocarvalhido');
    var workerAdminContacts = factory.newConcept(NS, 'Contacts');
    workerAdminContacts.phoneNumber = "922222222";
    workerAdminContacts.email = "workeradmin@email.com";
    workerAdmin.contacts = workerAdminContacts;
    workerAdmin.firstname = "Tiago";
    workerAdmin.lastname = "Carvalhido";
    workerAdmin.password = "123"
    workerAdmin.operator = factory.newRelationship(NS, 'Producer', 'PROD_001');

    // criar Worker
    var worker = factory.newResource(NS, 'Worker', 'joselima');
    var workerContacts = factory.newConcept(NS, 'Contacts');
    workerContacts.phoneNumber = "933333333";
    workerContacts.email = "worker@email.com";
    worker.contacts = workerContacts;
    worker.firstname = "Jose";
    worker.lastname = "Lima";
    worker.password = "123"
    worker.operator = factory.newRelationship(NS, 'Producer', 'PROD_001');

    /**
     * VALUE CHAIN OPERATORS
     */

    // criar Producer
    var producer = factory.newResource(NS, 'Producer', 'PROD_001');
    var producerContacts = factory.newConcept(NS, 'Contacts');
    producerContacts.phoneNumber = "9444444444";
    producerContacts.email = "producer@email.com";
    var producerAddress = factory.newConcept(NS, 'Address');
    producerAddress.street = "Rua do prod";
    producerAddress.zip = "4900-200";
    producerAddress.city = "Viana do Castelo";
    producerAddress.country = "Portugal";
    producer.name = "Quinta Vianense";
    producer.description = 'Produtores de leite';
    producer.contacts = producerContacts;
    producer.address = producerAddress;

    // criar Industry_Retailer
    var industry_retailer = factory.newResource(NS, 'Industry_Retailer', 'IR_001');
    var industry_retailerContacts = factory.newConcept(NS, 'Contacts');
    industry_retailerContacts.phoneNumber = "955555555";
    industry_retailerContacts.email = "industry_retailer@email.com";
    var industry_retailerAddress = factory.newConcept(NS, 'Address');
    industry_retailerAddress.street = "Rua da industra";
    industry_retailerAddress.zip = "4900-210";
    industry_retailerAddress.city = "Viana do Castelo";
    industry_retailerAddress.country = "Portugal";

    industry_retailer.name = "Milky Way";
    industry_retailer.description = 'Industria e retalhe de produtos lacticinios';
    industry_retailer.contacts = industry_retailerContacts;
    industry_retailer.address = industry_retailerAddress;

    // criar CertificationEntity
    var certificationEntity = factory.newResource(NS, 'CertificationEntity', 'CE_001');
    var certificationEntityContacts = factory.newConcept(NS, 'Contacts');
    certificationEntityContacts.phoneNumber = "966666666";
    certificationEntityContacts.email = "certificationEntity@email.com";
    var certificationEntityAddress = factory.newConcept(NS, 'Address');
    certificationEntityAddress.street = "Rua da entidade";
    certificationEntityAddress.zip = "4900-212";
    certificationEntityAddress.city = "Viana do Castelo";
    certificationEntityAddress.country = "Portugal";

    certificationEntity.name = "CE";
    certificationEntity.description = 'Entidade de certificação de produtos DOP';
    certificationEntity.contacts = certificationEntityContacts;
    certificationEntity.address = certificationEntityAddress;

    // criar LogisticsCompany
    var logisticsCompany = factory.newResource(NS, 'LogisticsCompany', 'LC_001');
    var logisticsCompanyContacts = factory.newConcept(NS, 'Contacts');
    logisticsCompanyContacts.phoneNumber = "955555555";
    logisticsCompanyContacts.email = "logisticsCompany@email.com";
    var logisticsCompanyAddress = factory.newConcept(NS, 'Address');
    logisticsCompanyAddress.street = "Rua do transporte";
    logisticsCompanyAddress.zip = "4900-100";
    logisticsCompanyAddress.city = "Viana do Castelo";
    logisticsCompanyAddress.country = "Portugal";

    logisticsCompany.name = "Logistica AltoMinhi";
    logisticsCompany.description = 'Companhia de distribuição';
    logisticsCompany.contacts = logisticsCompanyContacts;
    logisticsCompany.address = logisticsCompanyAddress;

    /**
     * EVENTS
     */

    /**
     * BATCH
     */



    return getParticipantRegistry(NS + '.SysAdmin')
        .then(function(sysAdminRegistry) {
            return sysAdminRegistry.addAll([sysAdmin]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.WorkerAdmin');
        })
        .then(function(workerAdminRegistry) {
            return workerAdminRegistry.addAll([workerAdmin]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Worker');
        })
        .then(function(workerRegistry) {
            return workerRegistry.addAll([worker]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Producer');
        })
        .then(function(producerRegistry) {
            return producerRegistry.addAll([producer]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Industry_Retailer');
        })
        .then(function(industry_retailerRegistry) {
            return industry_retailerRegistry.addAll([industry_retailer]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.CertificationEntity');
        })
        .then(function(certificationEntityRegistry) {
            return certificationEntityRegistry.addAll([certificationEntity]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.LogisticsCompany');
        })
        .then(function(logisticsCompanyRegistry) {
            return logisticsCompanyRegistry.addAll([logisticsCompany]);
        });

}

/**
 * Sample transaction processor function.
 * @param {org.doptrace.A_producerToLogistics} prodToLog The sample transaction instance.
 * @transaction
 */
async function prodToLog(prodToLog) {
    return getAssetRegistry('org.doptrace.LogisticsCompany').then(function(playerRegistry) {
        return playerRegistry.exists(prodToLog.newOwner.getIdentifier())
    }).then(function(exists) {
        return getAssetRegistry('org.doptrace.Producer')
            .then(function(playerRegistryHarvest) {
                return playerRegistryHarvest.exists(prodToLog.issuer.getIdentifier())
            }).then(function(existsHarvest) {
                return getAssetRegistry('org.doptrace.Batch')
                    .then(function(playerRegistryBatch) {
                        return playerRegistryBatch.exists(prodToLog.batch.getIdentifier())
                    }).then(function(existsBatch) {
                        if (!exists) {
                            throw Error('Companhia Logistica não registada !')
                        } else if (!existsHarvest) {
                            throw Error('Produtor não Registado !')
                        } else if (!existsBatch) {
                            throw Error('Lote não registado!')

                        } else if (exists && existsHarvest && existsBatch) {
                            getAssetRegistry('org.doptrace.Batch')
                                .then(function(assetRegistry) {

                                    prodToLog.batch.issuer = prodToLog.issuer
                                    prodToLog.batch.state = 'IN_TRANSIT'
                                    prodToLog.batch.owner = prodToLog.newOwner
                                    prodToLog.batch.previousOwners.push(prodToLog.issuer)

                                    assetRegistry.update(prodToLog.batch)



                                    ;
                                });;
                        }
                    })
            })
    })
}

/**
 * Sample transaction processor function.
 * @param {org.doptrace.B_logisticsToIndustry} logisticsToIndustry The sample transaction instance.
 * @transaction
 */

async function logisticsToIndustry(logisticsToIndustry) {
    return getAssetRegistry('org.doptrace.Industry_Retailer').then(function(playerRegistry) {
        return playerRegistry.exists(logisticsToIndustry.newOwner.getIdentifier())
    }).then(function(exists) {
        return getAssetRegistry('org.doptrace.LogisticsCompany')
            .then(function(playerRegistryHarvest) {
                return playerRegistryHarvest.exists(logisticsToIndustry.issuer.getIdentifier())
            }).then(function(existsHarvest) {
                return getAssetRegistry('org.doptrace.Batch')
                    .then(function(playerRegistryBatch) {
                        return playerRegistryBatch.exists(logisticsToIndustry.batch.getIdentifier())
                    }).then(function(existsBatch) {
                        if (!exists) {
                            throw Error('Industria não registada !')
                        } else if (!existsHarvest) {
                            throw Error('Companhia Logistica não Registada !')
                        } else if (!existsBatch) {
                            throw Error('Lote não registado!')

                        } else if (exists && existsHarvest && existsBatch) {
                            getAssetRegistry('org.doptrace.Batch')
                                .then(function(assetRegistry) {

                                    logisticsToIndustry.batch.issuer = logisticsToIndustry.issuer
                                    logisticsToIndustry.batch.state = 'IN_TRANSIT'
                                    logisticsToIndustry.batch.owner = logisticsToIndustry.newOwner
                                    logisticsToIndustry.batch.previousOwners.push(logisticsToIndustry.issuer)

                                    assetRegistry.update(logisticsToIndustry.batch)



                                    ;
                                });;
                        }
                    })
            })
    })
}



/**
 * Sample transaction processor function.
 * @param {org.doptrace.C_batchRegistration} batchRegistration The sample transaction instance.
 * @transaction
 */

async function batchRegistration(batchRegistration) {

    return getAssetRegistry('org.doptrace.Industry_Retailer')
        .then(function(playerRegistry) {
            return playerRegistry.exists(batchRegistration.retailer.getIdentifier())
        }).then(async function(exists) {
            return getAssetRegistry('org.doptrace.Batch')
                .then(function(playerRegistryBatch) {
                    return playerRegistryBatch.exists(batchRegistration.batch.getIdentifier())
                }).then(async function(existsHarvest) {
                    if (!exists && existsHarvest) {

                        throw Error('Industria não registada !')

                    } else if (exists && !existsHarvest) {

                        throw Error('Lote não registado !')

                    } else if (!exists && !existsHarvest) {

                        throw Error('ERRO NA TRANSAÇÃO!')

                    } else if (exists && existsHarvest) {


                        let result = await getAssetRegistry('org.doptrace.Batch')

                        let batchAsset = batchRegistration.batch

                        let batchId = batchAsset.id

                        let numberOfBatch = batchRegistration.numberOfBatchs;

                        let i;

                        for (i = 1; i <= numberOfBatch; i++) {

                            var factory = getFactory();

                            var random = Math.floor(Math.random() * (1000 - 100) + 100) / 100;

                            let batch = factory.newResource('org.doptrace', 'Batch', batchRegistration.batch.id + 'SubBatch' + random);

                            batch.unit = batchRegistration.newUnit
                            batch.state = 'REGISTERED'
                            batch.amount = batchRegistration.newAmount
                            batch.previousOwners = batchRegistration.batch.previousOwners
                            batch.issuer = batchRegistration.retailer
                            batch.owner = batchRegistration.retailer
                            batchRegistration.batch.previousOwners.push(batchRegistration.batch.issuer)

                            await result.addAll([batch]);



                        }
                        await result.update(batchRegistration.batch)
                    };
                });

        })
}



/**
 * Sample transaction processor function.
 * @param {org.doptrace.D_industryToEntity} industryToEntity The sample transaction instance.
 * @transaction
 */

async function industryToEntity(industryToEntity) {
    return getAssetRegistry('org.doptrace.CertificationEntity').then(function(playerRegistry) {
        return playerRegistry.exists(industryToEntity.newOwner.getIdentifier())
    }).then(function(exists) {
        return getAssetRegistry('org.doptrace.Industry_Retailer')
            .then(function(playerRegistryHarvest) {
                return playerRegistryHarvest.exists(industryToEntity.issuer.getIdentifier())
            }).then(function(existsHarvest) {
                return getAssetRegistry('org.doptrace.Batch')
                    .then(function(playerRegistryBatch) {
                        return playerRegistryBatch.exists(industryToEntity.batch.getIdentifier())
                    }).then(function(existsBatch) {
                        if (!exists) {
                            throw Error('Entidade de certificação não registada !')
                        } else if (!existsHarvest) {
                            throw Error('Companhia Logistica não Registada !')
                        } else if (!existsBatch) {
                            throw Error('Lote não registado!')

                        } else if (exists && existsHarvest && existsBatch) {
                            getAssetRegistry('org.doptrace.Batch')
                                .then(function(assetRegistry) {

                                    industryToEntity.batch.issuer = industryToEntity.issuer
                                    industryToEntity.batch.state = 'IN_TRANSIT'
                                    industryToEntity.batch.owner = industryToEntity.newOwner
                                    industryToEntity.batch.previousOwners.push(industryToEntity.issuer)

                                    assetRegistry.update(industryToEntity.batch)

                                    ;
                                });;
                        }
                    })
            })
    })
}
/**
 * Sample transaction processor function.
 * @param {org.doptrace.E_EntityToIndustry} entityToIndustry The sample transaction instance.
 * @transaction
 */

async function entityToIndustry(entityToIndustry) {
    return getAssetRegistry('org.doptrace.Industry_Retailer').then(function(playerRegistry) {
        return playerRegistry.exists(entityToIndustry.newOwner.getIdentifier())
    }).then(function(exists) {
        return getAssetRegistry('org.doptrace.CertificationEntity')
            .then(function(playerRegistryHarvest) {
                return playerRegistryHarvest.exists(entityToIndustry.issuer.getIdentifier())
            }).then(function(existsHarvest) {
                return getAssetRegistry('org.doptrace.Batch')
                    .then(function(playerRegistryBatch) {
                        return playerRegistryBatch.exists(entityToIndustry.batch.getIdentifier())
                    }).then(function(existsBatch) {
                        if (!exists) {
                            throw Error('Industria não registada !')
                        } else if (!existsHarvest) {
                            throw Error('Companhia Logistica não Registada !')
                        } else if (!existsBatch) {
                            throw Error('Lote não registado!')

                        } else if (exists && existsHarvest && existsBatch) {
                            getAssetRegistry('org.doptrace.Batch')
                                .then(function(assetRegistry) {

                                    entityToIndustry.batch.issuer = entityToIndustry.issuer
                                    entityToIndustry.batch.state = 'IN_TRANSIT'
                                    entityToIndustry.batch.owner = entityToIndustry.newOwner
                                    entityToIndustry.batch.previousOwners.push(entityToIndustry.issuer)

                                    assetRegistry.update(entityToIndustry.batch)

                                    ;
                                });;
                        }
                    })
            })
    })
}

/**
 * Sample transaction processor function.
 * @param {org.doptrace.F_EntityToLogistics} entityToLogistics The sample transaction instance.
 * @transaction
 */

async function entityToLogistics(entityToLogistics) {
    return getAssetRegistry('org.doptrace.LogisticsCompany').then(function(playerRegistry) {
        return playerRegistry.exists(entityToLogistics.newOwner.getIdentifier())
    }).then(function(exists) {
        return getAssetRegistry('org.doptrace.CertificationEntity')
            .then(function(playerRegistryHarvest) {
                return playerRegistryHarvest.exists(entityToLogistics.issuer.getIdentifier())
            }).then(function(existsHarvest) {
                return getAssetRegistry('org.doptrace.Batch')
                    .then(function(playerRegistryBatch) {
                        return playerRegistryBatch.exists(entityToLogistics.batch.getIdentifier())
                    }).then(function(existsBatch) {
                        if (!exists) {
                            throw Error('Companhia Logistica não registada !')
                        } else if (!existsHarvest) {
                            throw Error('Entidade de Certificação não Registada !')
                        } else if (!existsBatch) {
                            throw Error('Lote não registado!')

                        } else if (exists && existsHarvest && existsBatch) {
                            getAssetRegistry('org.doptrace.Batch')
                                .then(function(assetRegistry) {

                                    entityToLogistics.batch.issuer = entityToLogistics.issuer
                                    entityToLogistics.batch.state = 'IN_TRANSIT'
                                    entityToLogistics.batch.owner = entityToLogistics.newOwner
                                    entityToLogistics.batch.previousOwners.push(entityToLogistics.issuer)

                                    assetRegistry.update(entityToLogistics.batch)

                                    ;
                                });;
                        }
                    })
            })
    })
}



/**
 * Sample transaction processor function.
 * @param {org.doptrace.query} query The sample transaction instance.
 * @transaction
 */

async function query(query) {

    let assetRegistry = await getAssetRegistry('org.doptrace.Events');
    let results = await query('query');
}