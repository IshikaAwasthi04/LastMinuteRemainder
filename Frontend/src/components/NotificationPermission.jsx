import { useEffect } from "react";

import { requestNotificationPermission } from "../utils/notification";

function NotificationPermission() {

    useEffect(() => {

        requestNotificationPermission();

    }, []);

    return null;

}

export default NotificationPermission;