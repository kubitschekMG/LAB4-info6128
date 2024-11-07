// JavaScript for handling notification permission and showing notifications

document.addEventListener('DOMContentLoaded', () => {
    const permissionButton = document.getElementById('notify-permission-btn');
    const notificationForm = document.getElementById('notification-form');
    const messageOutput = document.getElementById('message-output');
  
    // Check permission on page load and toggle form/button visibility
    if (Notification.permission === 'granted') {
      permissionButton.style.display = 'none';
      notificationForm.style.display = 'block';
    } else {
      permissionButton.style.display = 'block';
      notificationForm.style.display = 'none';
    }
  
    // Request permission for notifications
    permissionButton.addEventListener('click', () => {
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            permissionButton.style.display = 'none';
            notificationForm.style.display = 'block';
            messageOutput.style.display = 'none';
          } else {
            messageOutput.style.display = 'block';
            messageOutput.textContent = 'Permission denied. Notifications cannot be shown.';
          }
        });
      } else {
        alert("This browser does not support notifications.");
      }
    });
  
    // Show notification
    document.getElementById('show-notification-btn').addEventListener('click', () => {
      const title = document.getElementById('notification-title').value.trim();
      const body = document.getElementById('notification-body').value.trim();
  
      // Validate that the title field is not empty
      if (!title) {
        messageOutput.style.display = 'block';
        messageOutput.textContent = 'Please enter a title for the notification.';
        return;
      }
  
      // Hide any previous messages
      messageOutput.style.display = 'none';
  
      // Create and display the notification
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body: body,
          icon: 'https://example.com/notification-icon.png', // Example icon
          actions: [
            { action: 'agree', title: 'Agree' },
            { action: 'disagree', title: 'Disagree' }
          ]
        });
      } else {
        alert("Notification permission not granted.");
      }
    });
  });
  