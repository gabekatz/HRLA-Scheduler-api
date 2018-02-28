import Promise from 'bluebird';

import { Timeslot } from '../model/timeslot';

const getTimeslots = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({
      where: { 
        RoomId: id,
        finished: false,
      }
    })
      .then(timeslots => {
        const timeslotsArr = [];
        for (let i = 0; i < timeslots.length; i++) {
          timeslotsArr.push(timeslots[i].dataValues);
        }
        resolve(timeslotsArr);
      })
      .catch(err => {
        console.log(`Error finding Timeslots for Room: ${id}. Error: ${err}`);
        reject({
          message: `Error finding timeslots`
        });
      });
  });
};

const findAllTimeslots = () => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({
      where: { finished: false }
    })
      .then(timeslots => {
        const timeslotArr = [];
        for (let i = 0; i < timeslots.length; i++) {
          timeslotData.push(timeslots[i].dataValues);
        }
        resolve(timeslotArr);
      })
      .catch(err => {
        console.log(`Error finding all Timeslots. Error: ${err}`);
        reject({
          message: `Error finding Timeslots`,
          timeslots: false,
        });
      });
  });
};

const addTimeslot = (timeslotObj) => {
  return new Promise((resolve, reject) => {
    Timeslot.create(timeslotObj)
      .then(() => {
        resolve(`Timeslot Created`);
      })
      .catch(err => {
        console.log(`Error creating Timeslot`);
        reject({
          message: `Error creating Timeslot`,
          timeslot: false,
        });
      });
  });
};

const findAllUserTimeslots = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.findAll({
      where: {
        UserId: id,
        finished: false,
      }
    })
      .then(timeslots => {
        const timeslotArr = [];
        for (let i = 0; i < timeslots.length; i++) {
          timeslotArr.push(timeslots[i].dataValues);
        }
        resolve(timeslotArr);
      })
      .catch(err => {
        console.log(`Error finding all User Timeslots. Error: ${err}`);
        reject({
          message: `Error finding all User Timeslots`,
          timeslot: false,
        });
      });
  });
};

const updateTimeslot = (timeslotObj, id) => {
  return new Promise((resolve, reject) => {
    Timeslot.update(timeObj, {
      where: { id }
    })
      .then(updated => {
        if (updated[0] === 0) {
          reject({
            message: `Timeslot to update not found`,
            updated: false,
          });
        } else {
          resolve(`Timeslot Updated`);
        }
      })
      .catch(err => {
        console.log(`Error updating Timeslot. Error: ${err}`);
        reject({
          message: `Error updating Timeslot`,
          updated: false,
        });
      });
  });
};

const removeTimeslot = (id) => {
  return new Promise((resolve, reject) => {
    Timeslot.destroy({
      where: { id }
    })
      .then(deleted => {
        if (deleted === 0) {
          reject({
            message: `Timeslot to delete not found`,
            deleted: false,
          });
        } else {
          resolve(`Timeslot Deleted`);
        }
      })
      .catch(err => {
        console.log(`Error deleting Timeslot. Error: ${err}`);
        reject({
          message: `Error deleting Timeslot`,
          deleted: false,
        });
      });
  });
};

export { getTimeslots, findAllTimeslots, addTimeslot, findAllUserTimeslots, updateTimeslot, removeTimeslot };
