(function (window) {
    "use strict";

    var setts = {
        "SERVER_URL": "http://localhost:8061/",
        "MFL_GUIDE_URL": "http://ehealth.go.ke/public/Master_Facility_Lis"+
        "t_-_Implementation_Guide.pdf",
        "CREDZ": {
            "client_id": "5O1KlpwBb96ANWe27ZQOpbWSF4DZDm4sOytwdzGv",
            "client_secret": "PqV0dHbkjXAtJYhY9UOCgRVi5BzLhiDxGU91" +
                             "kbt5EoayQ5SYOoJBYRYAYlJl2RetUeDMpSvh" +
                             "e9DaQr0HKHan0B9ptVyoLvOqpekiOmEqUJ6H" +
                             "ZKuIoma0pvqkkKDU9GPv",
            "token_url": "o/token/",
            "revoke_url": "o/revoke_token/"
        },
        "TIMEOUT": {"kickout": 9000000, "warning": 30}
    };

    setts.CREDZ.token_url = setts.SERVER_URL + setts.CREDZ.token_url;
    setts.CREDZ.revoke_url = setts.SERVER_URL + setts.CREDZ.revoke_url;

    window.MFL_SETTINGS = setts;

})(window);
