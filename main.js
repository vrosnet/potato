/**
 * Mobile OTP self-service station and administration console
 * Version 1.0
 * 
 * PHP Version 5 with PDO, MySQL, and PAM support
 * 
 * Written by Markus Berg
 *   email: markus@kelvin.nu
 *   http://kelvin.nu/mossad/
 * 
 * Copyright 2011 Markus Berg
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */

var LogoutTimer = (function(){
    var idTimer;
    var timeStart = 0;
    var timeTimeout = 1000*60*30;
    return {
        start: function() {
            idTimer = setTimeout(function() {
                window.location="logout.php?reason=inactivity";
            }, timeTimeout);
            var dateNow = new Date();
            timeStart = dateNow.getTime();
        },
        stop: function() {
            timeStart = 0;
            clearTimeout(idTimer);
        },
        restart: function() {
            this.stop();
            this.start();
        },
        forceLogout: function() {
            window.location="logout.php?reason=sessionexpired";
        },
        getTimeUntilLogout: function() {
            if (timeStart == 0) {
                return 0;
            }
            var dateNow = new Date();
            return timeStart + timeTimeout - dateNow.getTime();
        }
    };
})();

