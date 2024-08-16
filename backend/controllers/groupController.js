const Group = require('../models/Group');

const createGroup = async (req, res) => {
    const { name, userId } = req.body;
    const group = new Group({ name, userId });
    try {
        const savedGroup = await group.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGroups = async (req, res) => {
    const { userId } = req.query;
    try {
        const groups = await Group.find({ userId });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGroup = async (req, res) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(updatedGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGroup = await Group.findByIdAndDelete(id);
        if (!deletedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json({ message: 'Group deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group', error });
    }
};

module.exports = {
    createGroup,
    getGroups,
    getGroupById,
    updateGroup,
    deleteGroup
};

