// Generated by CoffeeScript 1.9.3
(function() {
  var AdLayersAPI, AdLayersDFPAPI,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AdLayersAPI = (function() {
    function AdLayersAPI() {
      this.adServer = null;
      this.nextSlotId = 1;
    }

    AdLayersAPI.prototype.refresh = function(adUnit) {
      if (this.functionExists('refresh')) {
        return this.adServer.refresh(adUnit);
      }
    };

    AdLayersAPI.prototype.refreshAll = function() {
      if (this.functionExists('refreshAll')) {
        return this.adServer.refreshAll();
      }
    };

    AdLayersAPI.prototype.functionExists = function(name) {
      return (this.adServer != null) && indexOf.call(this.adServer, name) >= 0;
    };

    AdLayersAPI.prototype.generateSlotName = function() {
      return "ad_layers_slot_" + (this.nextSlotId++);
    };

    AdLayersAPI.prototype.generateAd = function() {
      var slotName;
      slotName = this.generateSlotName();
      $('body').append($('<div>').attr('id', slotName));
      return slotName;
    };

    return AdLayersAPI;

  })();

  AdLayersDFPAPI = (function(superClass) {
    extend(AdLayersDFPAPI, superClass);

    function AdLayersDFPAPI() {
      return AdLayersDFPAPI.__super__.constructor.apply(this, arguments);
    }

    AdLayersDFPAPI.prototype.refresh = function(adUnit) {
      if ((typeof dfpAdUnits !== "undefined" && dfpAdUnits !== null) && (dfpAdUnits[adUnit] != null)) {
        googletag.pubads().refresh([dfpAdUnits[adUnit]]);
      }
      return {
        generateAd: function(path, targets) {
          var slotName;
          slotName = AdLayersDFPAPI.__super__.refresh.call(this);
          return googletag.cmd.push(function() {
            var key, slot, value;
            slot = googletag.defineSlot(path, [728, 90], slotName);
            for (key in targets) {
              value = targets[key];
              slot.setTargeting(key, value);
            }
            slot.addService(googletag.pubads());
            googletag.display(slotName);
            return googletag.pubads().refresh([slot]);
          });
        }
      };
    };

    return AdLayersDFPAPI;

  })(AdLayersAPI);

}).call(this);
