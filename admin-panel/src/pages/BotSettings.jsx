// src/pages/BotSettings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BotSettings = () => {
  const [settings, setSettings] = useState({
    weatherApiKey: "",
    telegramBotToken: "",
  });

  useEffect(() => {
    axios
      .get("/api/admin/settings")
      .then((response) => setSettings(response.data));
  }, []);

  const handleUpdate = async () => {
    await axios.put("/api/admin/settings", settings);
    alert("Settings updated");
  };

  return (
    <div>
      <h2>Bot Settings</h2>
      <label>
        Weather API Key
        <input
          value={settings.weatherApiKey}
          onChange={(e) =>
            setSettings({ ...settings, weatherApiKey: e.target.value })
          }
        />
      </label>
      <label>
        Telegram Bot Token
        <input
          value={settings.telegramBotToken}
          onChange={(e) =>
            setSettings({ ...settings, telegramBotToken: e.target.value })
          }
        />
      </label>
      <button onClick={handleUpdate}>Update Settings</button>
    </div>
  );
};

export default BotSettings;
