'use strict';

/**
 * regional service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::regional.regional');
