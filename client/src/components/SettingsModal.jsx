import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const SettingsModal = ({
  isOpen,
  onClose,
  timeFormat,
  onTimeFormatChange,
  showSeconds,
  onShowSecondsChange,
  showQuotes,
  onShowQuotesChange,
  showProductivePeople,
  onShowProductivePeopleChange,
  workTime,
  onWorkTimeChange,
  restTime,
  onRestTimeChange,
}) => {
  const [selectedFormat, setSelectedFormat] = useState(timeFormat);
  const [showSecondsValue, setShowSecondsValue] = useState(showSeconds);
  const [showQuotesValue, setShowQuotesValue] = useState(showQuotes);
  const [showProductivePeopleValue, setShowProductivePeopleValue] =
    useState(showProductivePeople);
  const [workTimeValue, setWorkTimeValue] = useState(workTime);
  const [restTimeValue, setRestTimeValue] = useState(restTime);

  useEffect(() => {
    setSelectedFormat(timeFormat);
  }, [timeFormat]);

  useEffect(() => {
    setShowSecondsValue(showSeconds);
  }, [showSeconds]);

  useEffect(() => {
    setShowQuotesValue(showQuotes);
  }, [showQuotes]);

  useEffect(() => {
    setShowProductivePeopleValue(showProductivePeople);
  }, [showProductivePeople]);

  useEffect(() => {
    setWorkTimeValue(workTime);
  }, [workTime]);

  useEffect(() => {
    setRestTimeValue(restTime);
  }, [restTime]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    onTimeFormatChange(format);
  };

  const handleShowSecondsChange = (checked) => {
    setShowSecondsValue(checked);
    onShowSecondsChange(checked);
  };

  const handleShowQuotesChange = (checked) => {
    setShowQuotesValue(checked);
    onShowQuotesChange(checked);
  };

  const handleShowProductivePeopleChange = (checked) => {
    setShowProductivePeopleValue(checked);
    onShowProductivePeopleChange(checked);
  };

  const handleWorkTimeChange = (time) => {
    setWorkTimeValue(time);
    onWorkTimeChange(time);
  };

  const handleRestTimeChange = (time) => {
    setRestTimeValue(time);
    onRestTimeChange(time);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="settings-modal-title"
    >
      <div
        className="bg-[#1f2937] rounded-2xl p-8 w-full max-w-md mx-4 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            id="settings-modal-title"
            className="text-2xl font-semibold text-white"
          >
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close settings"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Time Format Setting */}
        <div className="mb-6">
          <label
            htmlFor="time-format"
            className="block text-sm font-medium text-white/90 mb-3"
          >
            Time Format
          </label>
          <FormControl fullWidth>
            <Select
              id="time-format"
              value={selectedFormat}
              onChange={(e) => handleFormatChange(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#1f2937',
                    color: 'white',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(99, 102, 241, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 0.4)',
                        },
                      },
                    },
                  },
                },
              }}
              sx={{
                backgroundColor: '#2d3748',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '2px solid #6366f1',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            >
              <MenuItem value="24h">24 Hour</MenuItem>
              <MenuItem value="12h">12 Hour</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Pomodoro Timer Settings */}
        <div className="mb-6">
          <div className="flex gap-4">
            {/* Work Time */}
            <div className="flex-1">
              <label
                htmlFor="work-time"
                className="block text-sm font-medium text-white/90 mb-3"
              >
                Work Time
              </label>
              <FormControl fullWidth>
                <Select
                  id="work-time"
                  value={workTimeValue}
                  onChange={(e) =>
                    handleWorkTimeChange(parseInt(e.target.value, 10))
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#1f2937',
                        color: 'white',
                        '& .MuiMenuItem-root': {
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(99, 102, 241, 0.3)',
                            '&:hover': {
                              backgroundColor: 'rgba(99, 102, 241, 0.4)',
                            },
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: '#2d3748',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid #6366f1',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem value={25}>25 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                  <MenuItem value={120}>2 hours</MenuItem>
                  <MenuItem value={240}>4 hours</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* Rest Time */}
            <div className="flex-1">
              <label
                htmlFor="rest-time"
                className="block text-sm font-medium text-white/90 mb-3"
              >
                Rest Time
              </label>
              <FormControl fullWidth>
                <Select
                  id="rest-time"
                  value={restTimeValue}
                  onChange={(e) =>
                    handleRestTimeChange(parseInt(e.target.value, 10))
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#1f2937',
                        color: 'white',
                        '& .MuiMenuItem-root': {
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(99, 102, 241, 0.3)',
                            '&:hover': {
                              backgroundColor: 'rgba(99, 102, 241, 0.4)',
                            },
                          },
                        },
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: '#2d3748',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid #6366f1',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem value={5}>5 minutes</MenuItem>
                  <MenuItem value={15}>15 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                  <MenuItem value={120}>2 hours</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        {/* Show Seconds Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="show-seconds"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Show Seconds
            </label>
            <Switch
              id="show-seconds"
              checked={showSecondsValue}
              onChange={(e) => handleShowSecondsChange(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#6366f1',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </div>

        {/* Show Quotes Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="show-quotes"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Show Quotes
            </label>
            <Switch
              id="show-quotes"
              checked={showQuotesValue}
              onChange={(e) => handleShowQuotesChange(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#6366f1',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </div>

        {/* Show Productive People Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="show-productive-people"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Show Productive People
            </label>
            <Switch
              id="show-productive-people"
              checked={showProductivePeopleValue}
              onChange={(e) =>
                handleShowProductivePeopleChange(e.target.checked)
              }
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#6366f1',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </div>

        {/* Footer note */}
        <p className="text-sm text-gray-300 text-center">
          You know better how you will be more productive.
        </p>
      </div>
    </div>
  );
};

export default SettingsModal;
