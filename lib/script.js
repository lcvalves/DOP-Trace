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
     * VALUE CHAIN OPERATORS
     */

    // criar Producer
    var producer = factory.newResource(NS, 'Producer', 'PROD_001');
    producer.phoneNumber = "9444444444";
    producer.email = "producer@email.com";
    producer.street = "Rua do prod";
    producer.zip = "4900-200";
    producer.city = "Viana do Castelo";
    producer.country = "Portugal";
    producer.name = "Quinta Vianense";
    producer.description = 'Produtores de leite';

    // criar Industry_Retailer
    var industry_retailer = factory.newResource(NS, 'Industry_Retailer', 'IR_001');
    industry_retailer.phoneNumber = "955555555";
    industry_retailer.email = "industry_retailer@email.com";
    industry_retailer.street = "Rua da industra";
    industry_retailer.zip = "4900-210";
    industry_retailer.city = "Viana do Castelo";
    industry_retailer.country = "Portugal";

    industry_retailer.name = "Milky Way";
    industry_retailer.description = 'Industria e retalhe de produtos lacticinios';


    // criar CertificationEntity
    var certificationEntity = factory.newResource(NS, 'CertificationEntity', 'CE_001');
    certificationEntity.phoneNumber = "966666666";
    certificationEntity.email = "certificationEntity@email.com";
    certificationEntity.street = "Rua da entidade";
    certificationEntity.zip = "4900-212";
    certificationEntity.city = "Viana do Castelo";
    certificationEntity.country = "Portugal";
    certificationEntity.name = "CE";
    certificationEntity.description = 'Entidade de certificação de produtos DOP';


    // criar Logistics
    var logistics = factory.newResource(NS, 'Logistics', 'L_001');

    logistics.phoneNumber = "955555555";
    logistics.email = "logistics@email.com";

    logistics.street = "Rua do transporte";
    logistics.zip = "4900-100";
    logistics.city = "Viana do Castelo";
    logistics.country = "Portugal";

    logistics.name = "Logistica AltoMinho";
    logistics.description = 'Companhia de distribuição';


    /**
     * PARTICIPANTS
     */

    // criar SysAdmin (luisalves é username [sysadmin id])
    var sysAdmin = factory.newResource(NS, 'SysAdmin', 'luisalves');
    sysAdmin.phoneNumber = "911111111";
    sysAdmin.email = "admin@email.com";
    sysAdmin.firstname = "Luis";
    sysAdmin.lastname = "Alves";
    sysAdmin.password = "123";

    // criar WorkerAdmin
    var workerAdmin = factory.newResource(NS, 'WorkerAdmin', 'tiagocarvalhido');

    workerAdmin.phoneNumber = "922222222";
    workerAdmin.email = "workeradmin@email.com";

    workerAdmin.firstname = "Tiago";
    workerAdmin.lastname = "Carvalhido";
    workerAdmin.password = "123"
    workerAdmin.operator = factory.newRelationship(NS, 'Producer', 'PROD_001');

    // criar Worker
    var worker = factory.newResource(NS, 'Worker', 'joselima');

    worker.phoneNumber = "933333333";
    worker.email = "worker@email.com";

    worker.firstname = "Jose";
    worker.lastname = "Lima";
    worker.password = "123"
    worker.operator = factory.newRelationship(NS, 'Producer', 'PROD_001');

    /**
     * EVENTS
     */

    /**
     * BATCH
     */


    // assets
    return getAssetRegistry(NS + '.Producer')
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
            return getAssetRegistry(NS + '.Logistics');
        })
        .then(function(logisticsRegistry) {
            return logisticsRegistry.addAll([logistics]);
        })
        // participants
        .then(function() {
            return getParticipantRegistry(NS + '.SysAdmin');
        })
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
        });

}

/**
 * Sample transaction processor function.
 * @param {org.doptrace.transactionProductRegistration} productRegistration The sample transaction instance
 * @transaction
 */

function productRegistation(productRegistation) {

    var array = new Array();

    //Validação da data de expiração
    var now = new Date();

    var expirationDate = new Date(productRegistation.productRegistration.newBatch.expirationDate);


    return getAssetRegistry('org.doptrace.Producer').then(function(playerRegistry) {
        return playerRegistry.exists(productRegistation.productRegistration.operator.getIdentifier())
    }).then(function(exists) {

        return getParticipantRegistry('org.doptrace.Worker').then(function(playerRegistry) {
            return playerRegistry.exists(productRegistation.productRegistration.worker.getIdentifier())
        }).then(function(existsWorker) {

            return getAssetRegistry('org.doptrace.Product').then(function(playerRegistry) {

                return playerRegistry.exists(productRegistation.productRegistration.newBatch.product.getIdentifier())
            }).then(function(existsProduct) {

                if (expirationDate <= now) {

                    throw Error('Data de validade não pode ser inferior nem igual à data de criação do Lote');




                } else if (!exists) {
                    throw Error('Produtor não registado !');

                } else if (!existsWorker) {

                    throw Error('Worker não registado !');

                } else if (!existsProduct) {

                    throw Error('Produto não registado !');

                } else if (exists && existsWorker && existsProduct && productRegistation.productRegistration.newBatch != null) {

                    getAssetRegistry('org.doptrace.ProductRegistration')
                        .then(function(assetRegistry) {
                            var factory = getFactory();
                            var newAsset = factory.newResource(
                                'org.doptrace',
                                'ProductRegistration',
                                productRegistation.productRegistration.id);

                            newAsset.description = productRegistation.productRegistration.description;
                            newAsset.latitude = productRegistation.productRegistration.latitude;
                            newAsset.longitude = productRegistation.productRegistration.longitude;
                            newAsset.dateTime = now;
                            newAsset.worker = productRegistation.productRegistration.worker;
                            newAsset.operator = productRegistation.productRegistration.operator;
                            array.push(newAsset);


                            return assetRegistry.add(newAsset);



                            ;
                        }).then(function(batchRegistry) {
                                getAssetRegistry('org.doptrace.Batch')
                                    .then(function(batchRegistry2) {



                                        var factory = getFactory();

                                        var newBatch = factory.newResource(
                                            'org.doptrace',
                                            'Batch',
                                            productRegistation.productRegistration.newBatch.id);



                                        newBatch.amount = productRegistation.productRegistration.newBatch.amount;
                                        newBatch.unit = productRegistation.productRegistration.newBatch.unit;
                                        newBatch.creationDate = now;
                                        newBatch.expirationDate = productRegistation.productRegistration.newBatch.expirationDate;
                                        newBatch.state = 'REGISTERED';
                                        newBatch.certificated = false;
                                        newBatch.previousEvents = array
                                        newBatch.previousOperator = null;
                                        newBatch.currentOperator = productRegistation.productRegistration.operator;
                                        newBatch.product = productRegistation.productRegistration.newBatch.product;

                                        return batchRegistry2.add(newBatch);





                                    });;

                            }

                        )
                } else {
                    throw Error('Novo Lote null');
                }
            })
        })
    })
}




/**
 * Sample transaction processor function.
 * @param {org.doptrace.transactionQualityAssessement} quality The sample transaction instance
 * @transaction
 */

function quality(quality) {

    var array = new Array();

    var now = new Date();

    var expirationDate = new Date(quality.quality.newBatch.expirationDate);


    return getAssetRegistry('org.doptrace.Industry_Retailer').then(function(playerRegistry) {
        return playerRegistry.exists(quality.quality.operator.getIdentifier())
    }).then(function(existsIndustry) {

        return getAssetRegistry('org.doptrace.Batch').then(function(playerRegistry) {

            return playerRegistry.exists(quality.quality.assessedBatch.getIdentifier())
        }).then(function(existsBatch) {

                if (expirationDate <= now) {

                    throw Error('Data de validade não pode ser inferior nem igual à data de criação do Lote');


                } else if (!existsIndustry) {

                    throw Error('Industria não registado !');

                } else if (!existsBatch) {

                    throw Error('Lote não registado !');

                } else if (existsIndustry && existsBatch && quality.quality.amountDowned == 0.00) {

                    getAssetRegistry('org.doptrace.QualityAssessment')
                        .then(function(assetRegistry) {
                            var factory = getFactory();
                            var newAsset = factory.newResource(
                                'org.doptrace',
                                'QualityAssessment',
                                quality.quality.id);

                            newAsset.description = quality.quality.description;
                            newAsset.latitude = quality.quality.latitude;
                            newAsset.longitude = quality.quality.longitude;
                            newAsset.dateTime = now;
                            newAsset.worker = quality.quality.worker;
                            newAsset.operator = quality.quality.operator;
                            newAsset.assessedBatch = quality.quality.assessedBatch
                            newAsset.amountDowned = quality.quality.amountDowned
                            array.push(newAsset)

                            return assetRegistry.add(newAsset);

                        }).then(function(batchRegistry) {
                            getAssetRegistry('org.doptrace.Batch')
                                .then(function(assetRegistry) {

                                    quality.quality.assessedBatch.currentOperator = quality.quality.operator

                                    assetRegistry.update(quality.quality.assessedBatch);


                                })
                        })
                } else if (existsBatch && existsIndustry && quality.quality.amountDowned != 0.00) {

                    getAssetRegistry('org.doptrace.QualityAssessment')
                        .then(function(assetRegistry) {
                            var factory = getFactory();
                            var newAsset = factory.newResource(
                                'org.doptrace',
                                'QualityAssessment',
                                quality.quality.id);

                            newAsset.description = quality.quality.description;
                            newAsset.latitude = quality.quality.latitude;
                            newAsset.longitude = quality.quality.longitude;
                            newAsset.dateTime = now;
                            newAsset.worker = quality.quality.worker;
                            newAsset.operator = quality.quality.operator;
                            newAsset.assessedBatch = quality.quality.assessedBatch
                            newAsset.amountDowned = quality.quality.amountDowned
                            array.push(newAsset)


                            return assetRegistry.add(newAsset);



                            ;
                        }).then(function(batchRegistry) {
                                getAssetRegistry('org.doptrace.Batch')
                                    .then(function(batchRegistry2) {



                                        var factory = getFactory();

                                        var newBatch = factory.newResource(
                                            'org.doptrace',
                                            'Batch',
                                            quality.quality.newBatch.id);

                                        newBatch.amount = quality.quality.assessedBatch.amount - quality.quality.amountDowned;
                                        newBatch.unit = quality.quality.assessedBatch.unit;
                                        newBatch.creationDate = now;
                                        newBatch.expirationDate = expirationDate
                                        newBatch.state = 'REGISTERED'
                                        newBatch.certificated = false
                                        newBatch.previousEvents = quality.quality.assessedBatch.previousEvents.concat(array)



                                        newBatch.previousOperator = quality.quality.assessedBatch.currentOperator


                                        newBatch.currentOperator = quality.quality.operator;

                                        newBatch.product = quality.quality.assessedBatch.product;

                                        return batchRegistry2.add(newBatch);


                                    });;



                            }



                        )
                } else {
                    throw Error('Erro na transação');
                }
            }

        )
    })
}

/**
 * Sample transaction processor function.
 * @param {org.doptrace.transactionTransformation} transformation The sample transaction instance
 * @transaction
 */


async function transformation(transformation) {

    //Tamanho dos arrays de Lotes e do array de quantidades
    var batchLength = transformation.transformation.usedBatches.length;
    var amountLength = transformation.transformation.amountPerBatch.length;

    //Array de Erros para verificação do batch
    var errors = new Array();

    //Array para concatenação de Eventos
    var array = new Array();

    //Variavel para correr os ciclos For
    let i;

    var now = new Date();

    var expirationDate = new Date(transformation.transformation.newBatch.expirationDate);



    //Verificação do Industry Retailer
    let registryIndustry = await getAssetRegistry('org.doptrace.Industry_Retailer');

    let resultIndustry = await registryIndustry.exists(transformation.transformation.operator.getIdentifier());

    if (!resultIndustry) {

        throw Error('Industria nao registada !')

    } else if (transformation.transformation.usedBatches.length <= 0) {

        throw Error('Preencha os lotes usados para transformação !')

    } else if (expirationDate <= now) {

        throw Error('Data de validade não pode ser inferior nem igual à data de criação do Lote');

    }

    //Verificação dos lotes usados
    for (i = 0; i < batchLength; i++) {

        let registryBatch = await getAssetRegistry('org.doptrace.Batch');


        let resultBatch = await registryBatch.exists(transformation.transformation.usedBatches[i].getIdentifier());

        if (resultIndustry && resultBatch && transformation.transformation.usedBatches != null) {

            let transformRegistry = await getAssetRegistry('org.doptrace.Transformation');

            var factory = getFactory();

            var newAsset = factory.newResource(
                'org.doptrace',
                'Transformation',
                transformation.transformation.id);

            newAsset.description = transformation.transformation.description;
            newAsset.latitude = transformation.transformation.latitude;
            newAsset.longitude = transformation.transformation.longitude;
            newAsset.dateTime = now
            newAsset.worker = transformation.transformation.worker;
            newAsset.processes = transformation.transformation.processes;
            newAsset.operator = transformation.transformation.operator
            newAsset.usedBatches = transformation.transformation.usedBatches;
            newAsset.amountPerBatch = transformation.transformation.amountPerBatch;
            array.push(newAsset)

            if (batchLength != amountLength) {

                throw Error('Erro na transação, introduza quantidade corresponde a lotes utilizados');

            } else {

                let registryBatch = await getAssetRegistry('org.doptrace.Batch');

                for (i = 0; i < batchLength; i++) {



                    var factory = getFactory();

                    var random = Math.floor(Math.random() * (1000 - 100) + 100) / 100;


                    if (transformation.transformation.usedBatches[i].amount > transformation.transformation.amountPerBatch[i]) {
                        var newBatch = factory.newResource(
                            'org.doptrace',
                            'Batch',
                            transformation.transformation.newBatch.id + random);

                        newBatch.unit = transformation.transformation.usedBatches[i].unit;
                        newBatch.creationDate = now
                        newBatch.expirationDate = transformation.transformation.usedBatches[i].expirationDate;
                        newBatch.state = 'TRANSFORMED'
                        newBatch.certificated = false

                        newBatch.previousOperator = transformation.transformation.usedBatches.slice(-1)[0].currentOperator

                        newBatch.previousEvents = transformation.transformation.usedBatches[i].previousEvents.concat(array)

                        newBatch.currentOperator = transformation.transformation.operator;


                        newBatch.product = transformation.transformation.usedBatches[i].product;
                        newBatch.amount = transformation.transformation.usedBatches[i].amount - transformation.transformation.amountPerBatch[i];

                        await registryBatch.addAll([newBatch]);

                    } else if (transformation.transformation.usedBatches[i].amount < transformation.transformation.amountPerBatch[i]) {
                        throw Error('Quantidade usada no lote ' + transformation.transformation.usedBatches[i] + ' excede a quantidade possivel');

                    } else if (transformation.transformation.usedBatches[i].amount == transformation.transformation.amountPerBatch[i]) {

                        console.log('Não houve criação de um lote de sobra');
                    }





                }

                var newBatch = factory.newResource(
                    'org.doptrace',
                    'Batch',
                    transformation.transformation.newBatch.id);

                newBatch.unit = transformation.transformation.newBatch.unit;
                newBatch.creationDate = now
                newBatch.expirationDate = transformation.transformation.newBatch.expirationDate;
                newBatch.state = 'TRANSFORMED'
                newBatch.certificated = false
                newBatch.previousOperator = transformation.transformation.newBatch.operator
                newBatch.previousEvents = transformation.transformation.newBatch.previousEvents.concat(array)
                newBatch.currentOperator = transformation.transformation.operator;

                newBatch.product = transformation.transformation.newBatch.product;
                newBatch.amount = transformation.transformation.newBatch.amount;

                await registryBatch.add(newBatch);


                //Adiciona o novo asset Transformation ao ledger
                return transformRegistry.add(newAsset);

            }
        } else {
            errors.push(new Error('Lote ' + transformation.transformation.usedBatches[i].getIdentifier() + ' não se encontra registado ! '));
        }


    }

    throw errors

}


/**
 * Sample transaction processor function.
 * @param {org.doptrace.transactionStorage} storage The sample transaction instance
 * @transaction
 */

async function storage(storage) {

    //Tamanho dos arrays de Lotes  
    var batchLength = storage.storage.storedBatches.length;

    //Array de Erros para verificação do batch
    var errors = new Array();

    //Array para concatenação de Eventos
    var array = new Array();

    //Variavel para correr os ciclos For
    let i;

    var now = new Date();

    //Verificação do Industry Retailer
    let registryIndustry = await getAssetRegistry('org.doptrace.Industry_Retailer');

    let resultIndustry = await registryIndustry.exists(storage.storage.operator.getIdentifier());

    if (!resultIndustry) {

        throw Error('Industria nao registada !')

    } else if (storage.storage.storedBatches.length < 1) {

        throw Error('Preencha os lotes usados para Armazenar !')

    }

    //Verificação dos lotes usados
    for (i = 0; i < batchLength; i++) {

        let registryBatch = await getAssetRegistry('org.doptrace.Batch');

        let resultBatch = await registryBatch.exists(storage.storage.storedBatches[i].getIdentifier());

        if (resultIndustry && resultBatch && storage.storage.storedBatches != null) {

            let storageRegistry = await getAssetRegistry('org.doptrace.Storage');

            var factory = getFactory();

            var newAsset = factory.newResource(
                'org.doptrace',
                'Storage',
                storage.storage.id);

            newAsset.description = storage.storage.description;
            newAsset.latitude = storage.storage.latitude;
            newAsset.longitude = storage.storage.longitude;
            newAsset.dateTime = now
            newAsset.worker = storage.storage.worker;
            newAsset.operator = storage.storage.operator
            newAsset.storedBatches = storage.storage.storedBatches;
            array.push(newAsset)

            console.log('STORAGE');

            await storageRegistry.add(newAsset);



        } else {
            errors.push(new Error('Lote ' + storage.storage.storedBatches[i].getIdentifier() + ' não se encontra registado ! '));
        }


        console.log('STORAGE_DOIS');



    }

    for (i = 0; i < batchLength; i++) {

        console.log('STORAGE_TRES');

        let registry = await getAssetRegistry('org.doptrace.Batch');

        storage.storage.storedBatches[i].previousOperator = storage.storage.storedBatches.slice(-1)[0].currentOperator

        console.log('STORAGE QUATRO');

        storage.storage.storedBatches[i].previousEvents = storage.storage.storedBatches[i].previousEvents.concat(array);

        storage.storage.storedBatches[i].state = 'STORED'



        storage.storage.storedBatches[i].currentOperator = storage.storage.operator





        return registry.update(storage.storage.storedBatches[i]);

        console.log('STORAGE CINCO');

    }

    throw errors

}




/**
 * Sample transaction processor function.
 * @param {org.doptrace.transactionAnalysis} analysis The sample transaction instance
 * @transaction
 */


async function analysis(analysis) {

    //Array para concatenação de Eventos
    var array = new Array();

    //Variavel para correr os ciclos For
    let i;

    //Verificação do Industry Retailer
    let registryCertification = await getAssetRegistry('org.doptrace.CertificationEntity');

    let resultCertification = await registryCertification.exists(analysis.analysis.operator.getIdentifier());

    if (!resultCertification) {

        throw Error('Entidade de certificação nao registada !')
    }

    let registryBatch = await getAssetRegistry('org.doptrace.Batch');

    let resultBatch = await registryBatch.exists(analysis.analysis.batch.getIdentifier());

    if (resultCertification && resultBatch) {

        let analysisRegistry = await getAssetRegistry('org.doptrace.Analysis');

        var factory = getFactory();

        var newAsset = factory.newResource(
            'org.doptrace',
            'Analysis',
            analysis.analysis.id);

        newAsset.description = analysis.analysis.description;
        newAsset.latitude = analysis.analysis.latitude;
        newAsset.longitude = analysis.analysis.longitude;
        newAsset.dateTime = new Date();
        newAsset.worker = analysis.analysis.worker;
        newAsset.certificated = true;
        newAsset.operator = analysis.analysis.operator
        newAsset.batch = analysis.analysis.batch;
        array.push(newAsset)


        await analysisRegistry.add(newAsset);




    } else {

        throw Error('Erro na transação');
    }

    let registry = await getAssetRegistry('org.doptrace.Batch');

    analysis.analysis.batch.previousOperator = analysis.analysis.batch.currentOperator

    analysis.analysis.batch.previousEvents = analysis.analysis.batch.previousEvents.concat(array);

    analysis.analysis.batch.certificated = true

    analysis.analysis.batch.state = 'CERTIFIED'

    analysis.analysis.batch.currentOperator = analysis.analysis.operator



    return registry.update(analysis.analysis.batch);

}





/**
 * Sample transaction processor function.
 * @param {org.doptrace.transactionDiscard} discard The sample transaction instance
 * @transaction
 */

async function discard(discard) {

    //Tamanho dos arrays de Lotes  
    var batchLength = discard.discard.discardedBatches.length;

    //Array de Erros para verificação do batch
    var errors = new Array();

    //Array para concatenação de Eventos
    var array = new Array();

    //Variavel para correr os ciclos For
    let i;

    var now = new Date();

    //Verificação do Logistics Company
    let registryLogistics = await getAssetRegistry('org.doptrace.Industry_Retailer');

    let resultLogistics = await registryLogistics.exists(discard.discard.operator.getIdentifier());

    if (!resultLogistics) {

        throw Error('Industria não registada !')

    } else if (discard.discard.discardedBatches.length < 1) {

        throw Error('Preencha os lotes usados para Baixa !')

    }

    console.log('NEM AQUI ?')

    //Verificação dos lotes usados
    for (i = 0; i < batchLength; i++) {


        console.log('12');
        let registryBatch = await getAssetRegistry('org.doptrace.Batch');

        let resultBatch = await registryBatch.exists(discard.discard.discardedBatches[i].getIdentifier());


        if (resultLogistics && resultBatch && discard.discard.discardedBatches != null) {

            console.log('13');

            let discardRegistry = await getAssetRegistry('org.doptrace.Discard');

            var factory = getFactory();

            var newAsset = factory.newResource(
                'org.doptrace',
                'Discard',
                discard.discard.id);

            newAsset.description = discard.discard.description;
            newAsset.latitude = discard.discard.latitude;
            newAsset.longitude = discard.discard.longitude;
            newAsset.dateTime = now
            newAsset.worker = discard.discard.worker;
            newAsset.motive = discard.discard.motive;
            newAsset.operator = discard.discard.operator
            newAsset.discardedBatches = discard.discard.discardedBatches;
            array.push(newAsset)

            console.log('14');

            await discardRegistry.add(newAsset);

            console.log('DISCARD NEGATIVO');

        } else {

            errors.push(new Error('Lote ' + discard.discard.discardedBatches[i].getIdentifier() + ' não se encontra registado ! '));
        }





    }


    for (i = 0; i < batchLength; i++) {

        let registry = await getAssetRegistry('org.doptrace.Batch');

        discard.discard.discardedBatches[i].previousEvents = discard.discard.discardedBatches[i].previousEvents.concat(array);

        discard.discard.discardedBatches[i].previousOperator = discard.discard.discardedBatches.slice(-1)[0].currentOperator

        discard.discard.discardedBatches[i].currentOperator = discard.discard.operator;

        discard.discard.discardedBatches[i].state = 'DISCARDED'


        return registry.update(discard.discard.discardedBatches[i]);


    }

    throw errors


}


/**
 * Sample transaction processor function.
 * @param {org.doptrace.transactionSale} sale The sample transaction instance
 * @transaction
 */

async function sale(sale) {

    var now = new Date();

    //Tamanho dos arrays de Lotes
    var batchLength = sale.sale.soldBatches.length;

    //Tamanho dos array amountPerBatch
    var amountPerBatch = sale.sale.amountPerBatch.length;

    //Tamanho do array salePrice
    var salePrice = sale.sale.salePrice.length;

    //Array de Erros para verificação do batch
    var errors = new Array();

    //Array para concatenação de Eventos
    var array = new Array();

    //Variavel para correr os ciclos For
    let i;

    // Random
    var random = Math.floor(Math.random() * (1000 - 100) + 100) / 100;

    //Verificação do Industry Retailer
    let registryIndustry = await getAssetRegistry('org.doptrace.Industry_Retailer');

    let resultSeller = await registryIndustry.exists(sale.sale.seller.getIdentifier());

    let resultBuyer = await registryIndustry.exists(sale.sale.buyer.getIdentifier());

    if (!resultSeller) {

        throw Error('Vendedor nao registado !')

    } else if (sale.sale.soldBatches.length <= 0) {
        throw Error('Preencha os lotes usados para a venda !')

    } else if (!resultBuyer) {

        throw Error('Comprador não registado')
    }

    if (batchLength != amountPerBatch || batchLength != salePrice || amountPerBatch != salePrice) {
        throw Error('Prencha campos correspondentes');

    } else {

        //Verificação dos lotes usados
        for (i = 0; i < batchLength; i++) {

            let registryBatch = await getAssetRegistry('org.doptrace.Batch');

            let resultBatch = await registryBatch.exists(sale.sale.soldBatches[i].getIdentifier());

            if (resultSeller && resultBuyer && resultBatch && sale.sale.soldBatches != null) {

                let saleRegistry = await getAssetRegistry('org.doptrace.Sale');

                var factory = getFactory();

                var newAsset = factory.newResource(
                    'org.doptrace',
                    'Sale',
                    sale.sale.id);

                newAsset.description = sale.sale.description;
                newAsset.latitude = sale.sale.latitude;
                newAsset.longitude = sale.sale.longitude;
                newAsset.dateTime = now;
                newAsset.worker = sale.sale.worker;
                newAsset.seller = sale.sale.seller;
                newAsset.buyer = sale.sale.buyer;
                newAsset.salePrice = sale.sale.salePrice;
                newAsset.amountPerBatch = sale.sale.amountPerBatch
                newAsset.soldBatches = sale.sale.soldBatches;
                array.push(newAsset)

                await saleRegistry.add(newAsset);

                let registryBatch = await getAssetRegistry('org.doptrace.Batch');

                for (i = 0; i < batchLength; i++) {

                    var factory = getFactory();

                    if (sale.sale.soldBatches[i].amount > sale.sale.amountPerBatch[i]) {



                        var newBatch = factory.newResource(
                            'org.doptrace',
                            'Batch',
                            sale.sale.newBatch.id + random);

                        newBatch.unit = sale.sale.soldBatches[i].unit;
                        newBatch.creationDate = now
                        newBatch.expirationDate = sale.sale.soldBatches[i].expirationDate;
                        newBatch.state = 'SOLD';

                        newBatch.previousOperator = sale.sale.soldBatches.slice(-1)[0].currentOperator

                        newBatch.certificated = sale.sale.soldBatches[i].certificated;
                        newBatch.previousEvents = sale.sale.soldBatches[i].previousEvents.concat(array)

                        newBatch.currentOperator = sale.sale.buyer;


                        newBatch.product = sale.sale.soldBatches[i].product;
                        newBatch.amount = sale.sale.amountPerBatch[i];

                        await registryBatch.addAll([newBatch]);


                        //Criação do batch de sobra
                        var newBatch = factory.newResource(
                            'org.doptrace',
                            'Batch',
                            sale.sale.newBatch.id + 'SaleBatch' + random);

                        newBatch.unit = sale.sale.soldBatches[i].unit;
                        newBatch.creationDate = now;
                        newBatch.expirationDate = sale.sale.soldBatches[i].expirationDate;
                        newBatch.previousOperator = sale.sale.soldBatches.slice(-1)[0].currentOperator
                        newBatch.state = sale.sale.soldBatches[i].state;
                        newBatch.certificated = sale.sale.soldBatches[i].certificated;
                        newBatch.previousEvents = sale.sale.soldBatches[i].previousEvents.concat(array)
                        newBatch.currentOperator = sale.sale.buyer;



                        newBatch.product = sale.sale.soldBatches[i].product;
                        newBatch.amount = sale.sale.soldBatches[i].amount - sale.sale.amountPerBatch[i];

                        await registryBatch.addAll([newBatch]);

                    } else if (sale.sale.soldBatches[i].amount < sale.sale.amountPerBatch[i]) {

                        throw Error('Quantidade usada no lote ' + sale.sale.soldBatches[i] + ' excede a quantidade possivel');

                    } else if (sale.sale.soldBatches[i].amount == sale.sale.amountPerBatch[i]) {

                        console.log('Não houve criação de um lote de sobra');
                    }


                }


                //Adiciona o novo asset Sale ao ledger
                return saleRegistry.add(newAsset);






            }

            errors.push(new Error('Lote ' + sale.sale.soldBatches[i].getIdentifier() + ' não se encontra registado ! '));


        }
    }

    throw errors

}


/**
 * Sample transaction processor function.
 * @param {org.doptrace.transactionTransport} transport The sample transaction instance
 * @transaction
 */

async function transport(transport) {



    //Tamanho dos arrays de Lotes  
    var batchLength = transport.transport.transportedBatches.length;

    //Array de Erros para verificação do batch
    var errors = new Array();

    //Array para concatenação de Eventos
    var array = new Array();

    //Variavel para correr os ciclos For
    let i;

    //Verificação do Logistics Company
    let registryLogistics = await getAssetRegistry('org.doptrace.Logistics');

    let resultLogistics = await registryLogistics.exists(transport.transport.operator.getIdentifier());

    if (!resultLogistics) {

        throw Error('Companhia de Logistica nao registada !')

    } else if (transport.transport.transportedBatches.length < 1) {

        throw Error('Preencha os lotes usados para transporte !')

    }
    let registryIndustry = await getAssetRegistry('org.doptrace.Industry_Retailer');

    let resultIndustry = await registryIndustry.exists(transport.transport.destinationAddress.getIdentifier())

    if (!resultIndustry) {

        throw Error('Industria não registada');
    }

    //Verificação dos lotes usados
    for (i = 0; i < batchLength; i++) {

        let registryBatch = await getAssetRegistry('org.doptrace.Batch');

        let resultBatch = await registryBatch.exists(transport.transport.transportedBatches[i].getIdentifier());

        if (resultIndustry && resultLogistics && resultBatch && transport.transport.transportedBatches != null) {

            let storageRegistry = await getAssetRegistry('org.doptrace.Transport');

            var factory = getFactory();

            var newAsset = factory.newResource(
                'org.doptrace',
                'Transport',
                transport.transport.id);

            newAsset.description = transport.transport.description;
            newAsset.latitude = transport.transport.latitude;
            newAsset.longitude = transport.transport.longitude;
            newAsset.dateTime = new Date();
            newAsset.worker = transport.transport.worker;
            newAsset.operator = transport.transport.operator;
            newAsset.destinationAddress = transport.transport.destinationAddress
            newAsset.transportedBatches = transport.transport.transportedBatches;
            array.push(newAsset)


            await storageRegistry.add(newAsset);







        } else {
            errors.push(new Error('Lote ' + transport.transport.transportedBatches[i].getIdentifier() + ' não se encontra registado ! '));
        }





    }

    for (i = 0; i < batchLength; i++) {

        let registry = await getAssetRegistry('org.doptrace.Batch');


        transport.transport.transportedBatches[i].previousEvents = transport.transport.transportedBatches[i].previousEvents.concat(array);

        transport.transport.transportedBatches[i].previousOperator = transport.transport.transportedBatches.slice(-1)[0].currentOperator

        transport.transport.transportedBatches[i].currentOperator = transport.transport.operator;
        transport.transport.transportedBatches[i].state = 'IN_TRANSIT'



        //Usar nas outras transações

        return registry.update(transport.transport.transportedBatches[i]);


    }

    throw errors

}