import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Team.css';

// Animation Variants
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

// Team Data with Images
const teamMembers = [
  {
    name: 'Pappu Chauhan',
    role: 'Founder & Master Craftsman',
    isFounder: true,
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777870550/user1_ihcylt.png',
    description:
      'With over 20 years of experience in iron fabrication, Pappu Chauhan founded the company with a vision to deliver exceptional craftsmanship.'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Senior Fabricator',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777870568/user2_lhwun7.png',
    description:
      'Expert in custom gate fabrication with 10+ years of experience and precision welding.'
  },
  {
    name: 'Surendra Pal',
    role: 'Welder & Fitter',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777870567/user_3_jqgwiw.jpg',
    description:
      'Specialist in all types of welding ensuring durability and strength in every structure.'
  },
  {
    name: 'Ajay Kumar',
    role: 'Finishing Specialist',
    image: 'https://res.cloudinary.com/dlixtmy1x/image/upload/v1777870568/user_4_ccfszt.jpg',
    description:
      'Delivers premium surface finishing and long-lasting paint quality.'
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

          {/* Team Grid */}
          <motion.div variants={itemVariants} className="team-page-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className={`team-card ${
                  member.isFounder ? 'team-card-founder' : ''
                }`}
              >
                {member.isFounder && (
                  <span className="founder-badge">Founder</span>
                )}

                <div className="team-card-image">
                  <img src={member.image} alt={member.name} />
                </div>

                <div className="team-card-info">
                  <h3>{member.name}</h3>
                  <span className="team-card-role">{member.role}</span>
                  <p>{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
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