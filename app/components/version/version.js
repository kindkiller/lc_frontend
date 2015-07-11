'use strict';

angular.module('lookchic.version', [
  'lookchic.version.interpolate-filter',
  'lookchic.version.version-directive'
])

.value('version', '0.1');
