function feelHasFeelingQuestionable(e){var n=e.field("Feeling: Questionable");return"Skip"!=n&&"N/A"!=n}function feelHasComment(e){return""!=e.field("Comment")}function feelHasLocaleOverride(e){return e.field("Feeling Locale Override (Reference)").length>0}function feelHasPosNegOverride(e){return e.field("Feeling Positive/Negative Override (Reference)").length>0}function feelHasDetailsQuestionable(e){return"N/A"!=e.field("Details: Questionable")}function feelHasBodyParts(e){return e.field("Body Parts (Reference)").length>0}function feelHasPersonRelationship(e){return e.field("Person Relationship Type (Reference)").length>0}function getFirstElementOrNull(e){return e.length>0?e[0]:null}
