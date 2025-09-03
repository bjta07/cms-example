'use strict';

/**
 * ejemplo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ejemplo.ejemplo');
