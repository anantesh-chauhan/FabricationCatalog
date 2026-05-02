import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Team.css';

// ============================================
// Team Page
// @desc    Static team page showing team members
// @route   /team
// ============================================

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

// Team data structure - can be updated easily
const teamMembers = [
  {
    name: 'Pappu Chauhan',
    role: 'Founder & Master Craftsman',
    initials: 'PC',
    isFounder: true,
    description: 'With over 20 years of experience in iron fabrication, Pappu Chauhan founded the company in 2010 with a vision to deliver exceptional quality craftsmanship. His attention to detail and innovative designs have made us a trusted name.'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Senior Fabricator',
    initials: 'RK',
    description: 'Expert in custom gate fabrication with 10+ years of experience. Rajesh specializes in intricate designs and precision welding.'
  },
  {
    name: 'Surendra Pal',
    role: 'Welder & Fitter',
    initials: 'SP',
    description: 'Skilled in all types of welding work, Surendra ensures every joint and connection is perfect and durable.'
  },
  {
    name: 'Ajay Kumar',
    role: 'Finishing Specialist',
    initials: 'AK',
    description: 'Expert in surface finishing and painting, Ajay gives every piece a flawless, long-lasting finish.'
  }
];

function Team() {
  return (
    <div className="team-page">
      <div className="container">
        <motion.div 
          className="team-page-content"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="team-page-header">
            <h1>Our Team</h1>
            <p>Meet the skilled craftsmen behind our quality work</p>
          </motion.div>

          {/* Team Members */}
          <motion.div variants={itemVariants} className="team-page-grid">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`team-card ${member.isFounder ? 'team-card-founder' : ''}`}
              >
                <div className="team-card-image">
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <div className="team-card-placeholder">
                      <span>{member.initials}</span>
                    </div>
                  )}
                </div>
                <div className="team-card-info">
                  <h3>{member.name}</h3>
                  <span className="team-card-role">{member.role}</span>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Join Team CTA */}
          <motion.div variants={itemVariants} className="team-page-cta">
            <h2>Want to Join Our Team?</h2>
            <p>
              We are always looking for skilled craftsmen. If you have experience 
              in iron fabrication and are passionate about quality work, we'd 
              love to hear from you.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Team;
